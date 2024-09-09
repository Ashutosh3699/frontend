import {toast } from "react-hot-toast";
import {setLoading, setToken} from "../../features/authSlice";
import {setUser} from "../../features/profileSlice";
import {resetCart} from "../../features/cartSlice"
import {apiConnector} from "../apiConnector";
import { endpoints } from "../apis";

const {SEND_OTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API} = endpoints;

// sendotp done --> 
export function sendOTP(email,navigate){
    return async(dispatch) =>{

        const toastId = toast.loading("...loading");
        dispatch(setLoading(true));

        try {
            
            // console.log("email at authapi is : ", email);
            const response = await apiConnector("POST", SEND_OTP_API, {
                email,
                checkUserPresent:true,
            });

            // console.log("Response after sending otp: ", response);
            // console.log(response.data.success);

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
// sign up -->  function left**
export function signup(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return  async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            
            const response =  await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            });

            // console.log("signup response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            };

            toast.success("sign up successfull");
            navigate("/login")
        } catch (error) {
            toast.error("signup is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
// login function --> left**
export function login(email,password,navigate){

    return  async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response =  await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            // console.log("login response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            };

            toast.success("login is successfull");

            dispatch(setToken(response.data.token));
            // take the user image for dashboard
            const userImage = response.data?.data?.image ?
            response.data.data.image
             : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data?.firstName} ${response.data.data?.lastName}`;

            dispatch(setUser({...response.data.data, image: userImage}));
            navigate("/dashboard/my-profile")
        } catch (error) {
            toast.error("login is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }

export function getResetToken(email,setResetToken){
    return async(dispatch)=>{
        const toastId = toast.loading("loading");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

            // console.log("respons after get reset token is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            setResetToken(true);
            toast.success("Email sent successfully");
        } catch (error) {
            console.log("Get reset token: ", error);
            toast.error("Failed while sending email");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getResetPassword(password,confirmPassword,token, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("loading");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {password,confirmPassword,token});
            // console.log("response after reset password is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            navigate("/reset-completed")
            toast.success("reset password successfully");
        } catch (error) {
            console.log("Get reset password: ", error);
            toast.error("Fail reseting password");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}