import {toast } from "react-hot-toast";
import {setLoading, setToken} from "../../features/authSlice";
import {setUser} from "../../features/profileSlice";
import {resetCart} from "../../features/cartSlice"
import {apiConnector} from "../apiConnector";
import { endpoints } from "../apis";

const {SEND_OTP_API, SIGNUP_API, LOGIN_API} = endpoints;

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

            console.log("signup response is: ", response);

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

            console.log("login response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            };

            toast.success("login is successfull");

            dispatch(setToken(response.data.token));
            // take the user image for dashboard
            const userImage = response.data?.user?.image ?
            response.data.user.image
             : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({...response.data.user, image: userImage}));
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