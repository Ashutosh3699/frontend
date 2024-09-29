import toast from "react-hot-toast";
import {payment_course, profileEndpoints} from "../apis";
import rzp_logo  from "../../assets/Logo/rzp_logo.png"
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../features/courseSlice";
import { resetCart } from "../../features/cartSlice";
import { setUser } from "../../features/profileSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} =payment_course;
const {GET_USER_DETAILS_API} = profileEndpoints

function loadScript(src){

    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;

        script.onload=()=>{
            resolve(true);
        };
        script.onerror=()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch) {
    
    const toastId = toast.loading("...loading");
    try {
        
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Error from razorpay SDK");
            return;
        }

        //initiate the order
        const orderResponse = await  apiConnector("POST", COURSE_PAYMENT_API,{courses},
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        // console.log("PRINTING orderResponse", orderResponse);

        // Open Razorpay Checkout
        const options ={
            key: process.env.RAZORPAY_ID,
            amount: `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: orderResponse.data.data.currency,
            name: 'Ashutosh Study',
            description: 'Test Transaction',
            image:rzp_logo,
            order_id: orderResponse.data.data.id, // This is the order_id created in the backend
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email
            },
            handler: function(response){
                // console.log("response is at handler: ", response);
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId)
}

const sendPaymentSuccessEmail= async(response, amount, token)=>{

    try {
        // console.log("response is: ", response);
         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId : response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

const verifyPayment=async(bodyData,token,navigate,dispatch)=>{
    const toastId = toast.loading("...loading");
    dispatch(setPaymentLoading(true));
    // console.log("bodyData is: ", bodyData);
    try {
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization: `Bearer ${token}`
        });
        // console.log("response is: ", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        const res = await apiConnector("GET",GET_USER_DETAILS_API,null,{
            Authorization: `Bearer ${token}`
        });
        console.log("res",res);
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(setUser(res?.data?.data));
        dispatch(resetCart());

    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}