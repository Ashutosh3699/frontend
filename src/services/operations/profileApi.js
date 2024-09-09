import {toast } from "react-hot-toast";
import {setUser,setLoading} from "../../features/profileSlice";
import {apiConnector} from "../apiConnector";
import {settingEndpoints} from "../apis"

const {UPDATE_PROFILE_PIC_API,UPDATE_PROFILE_API,CHANGE_PROFILE_API,DELETE_PROFILE_API} = settingEndpoints;

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