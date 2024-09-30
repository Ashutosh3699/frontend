import {toast } from "react-hot-toast";
import {setUser,setLoading} from "../../features/profileSlice";
import {apiConnector} from "../apiConnector";
import {settingEndpoints,profileEndpoints} from "../apis"

const {UPDATE_PROFILE_PIC_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API
    ,DELETE_PROFILE_API, GET_INSTRUCTOR_DATA_API} = settingEndpoints;
const {USER_ENROLLED_COURSE_API} = profileEndpoints

export function updateProfilePic(file,token){

   return async(dispatch)=>{

    const toastId = toast.loading("loading...");
    dispatch(setLoading(true));

    try {
        
        const formData = new FormData();
        formData.append('image', file);
        const response = await apiConnector("PUT", UPDATE_PROFILE_PIC_API,formData,{
            "Authorization": `Bearer ${token}`
        });

        console.log(" response is: ", response);

        if(!response.data.success){
            throw new Error(response.data.success);
        }

        // working here
        dispatch(setUser(response.data.data));
        toast.success("Upload of image is successfully done");

    } catch (error) {
        toast.error("upload of image is failed while process..");
        console.log(error);
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
   }
}

export function updateProfile(data,token){

    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("PUT", UPDATE_PROFILE_API,data,{
                "Authorization": `Bearer ${token}`
            });

            console.log(" response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            // working here
            dispatch(setUser(response.data.data));
            toast.success("Upload of image is successfully done");

        } catch (error) {
            toast.error("update of profile is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function changePassword(data,token){

    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("POST", CHANGE_PASSWORD_API,data,{
                "Authorization": `Bearer ${token}`
            });

            console.log(" response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            // working here
            dispatch(setUser(response.data.data));
            toast.success("Password is changed successfully done");

        } catch (error) {
            toast.error("password change is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getEnrolledCourses(token,setEnrolledCourses){

    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("GET", USER_ENROLLED_COURSE_API,null,{
                "Authorization": `Bearer ${token}`
            });

            console.log(" response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            // working here
            setEnrolledCourses(response.data.data);
            // dispatch(setUser(null));
            // toast.success("User courses is successfully fetched");

        } catch (error) {
            toast.error("User courses is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function DeleteAccount(token){
    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("DELETE", DELETE_PROFILE_API,null,{
                "Authorization": `Bearer ${token}`
            });

            console.log(" response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            // working here
            dispatch(setUser(null));
            toast.success("Delete account is successfully done");

        } catch (error) {
            toast.error("Delete account is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function getAccountCourses(token,setMyCourses){

    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("GET", USER_ENROLLED_COURSE_API,null,{
                "Authorization": `Bearer ${token}`
            });

            console.log(" response is: ", response);

            if(!response.data.success){
                throw new Error(response.data.success);
            }

            // working here
            setMyCourses(response.data.data);
            // dispatch(setUser(null));
            // toast.success("User courses is successfully fetched");

        } catch (error) {
            toast.error("User courses is failed while process..");
            console.log(error);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
      {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("GET_INSTRUCTOR_API_RESPONSE", response);
      result = response?.data?.courses
  
    }
    catch(error) {
      console.log("GET_INSTRUCTOR_API ERROR", error);
      toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
}