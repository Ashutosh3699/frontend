import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import {courseEndpoint,categories} from "../apis";

const {

    CREATE_CATEGORY_API, 
    CREATE_COURSE_API,
    CREATE_RATING_AND_REVIEW_API,
    CREATE_SECTION_API,
    CREATE_SUB_SECTION_API,

    UPDATE_SECTION_API,
    UPDATE_SUB_SECTION_API,

    GET_ALL_COURSE_API,
    // GET_ALL_RATING_API,
    // GET_ALL_RATING_OF_COURSE_API,
    // GET_AVG_RATING_API,
    GET_COURSE_DETAIL_API,

    DELETE_SECTION_API,
    DELETE_SUB_SECTION_API,

    EDIT_COURSE_API,
    LECTURE_COMPLETION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API
    
    } = courseEndpoint;

const {
    CATEGORY_API
    } = categories;


// get ALL Courses
export const getAllCourses= async()=>{

    const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const response  = await apiConnector("GET", GET_ALL_COURSE_API);

        if(!response.data.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// fetch course details-->change
export const fetchCourseDetails= async(courseId)=>{
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response  = await apiConnector("POST", GET_COURSE_DETAIL_API,{courseId});

        if(!response.data.success){
            throw new Error("Could Not Fetch Course by CourseID")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_COURSE_DETAIL_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// fetch courses by categories
export const fetchCourseCategories= async()=>{
    let result = []
    try {
      const response = await apiConnector("GET", CATEGORY_API)
      console.log("CATEGORY_API API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.data;
    } catch (error) {
      console.log("CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
}

// add the course details
export const addCourseDetails= async(data,token)=>{
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response  = await apiConnector("POST", CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          });

        if(!response.data.success){
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE_COURSE_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// edit the course details ********************bana nhi hai yeh********************
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

export const createSection = async(data,token)=>{
    const toastId = toast.loading("...loading");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Create Course section ")
          }
          toast.success("Course Section create Successfully")
          result = response?.data?.data
    } catch (error) {
        console.log("CREATE_SECTION_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// create a subsection
export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUB_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

//   update course section
  export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

//   update course sub section
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUB_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
 }

 // delete a section -->change
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// delete a subsection--->chnage
export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_SUB_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

// fetching all courses under a specific instructor*********************************nhi bana*******************
export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_INSTRUCTOR_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // delete a course*********************************nhi bana*******************
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }

// get full details of a course*********************************
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GET_COURSE_DETAIL_API,
        {
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }
  
// mark a lecture as complete*********************************nhi bana*******************
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
}

// create a rating for course 
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_AND_REVIEW_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }


