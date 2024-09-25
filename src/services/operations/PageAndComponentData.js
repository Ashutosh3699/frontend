import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import {getCategory} from "../apis"

export const getCatalogPageData = async(categoryId) => {

    const toastId = toast.loading("...loading");
    let result = [];
    try {
        const response = await apiConnector("POST", getCategory.CATEGORY_PAGE_DETAILS_API,{categoryId});
        console.log("response at pAcD : ", response);
        if(!response?.data?.success){
            throw new Error("No course found");
        }
        result = response?.data?.data;
        toast.success("Course Fetched successfully");
    } catch (error) {
        console.log("Error occurred while category page details");
        toast.error("Error at getCategory fetching");
    }
    toast.dismiss(toastId);

    return result;
}
