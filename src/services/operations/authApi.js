import {toast } from "react-hot-toast";
import {setLoading} from "../../features/authSlice";
import {apiConnector} from "../apiConnector";
import { endpoints } from "../apis";

const {SEND_OTP_API} = endpoints;

export function sendOTP(email,navigate){
    return async(dispatch) =>{

        const toastId = toast.loading("...loading");
        dispatch(setLoading(true));

        try {
            
            console.log("email at authapi is : ", email);
            const response = await apiConnector("POST", SEND_OTP_API, {
                email,
                checkUserPresent:true,
            });

            console.log("Response after sending otp: ", response);
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            toast.success("OTP send successfully");
            navigate("/verify-email");

        } catch (error) {
            
            toast.error("otp is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}