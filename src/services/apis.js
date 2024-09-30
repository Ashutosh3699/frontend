
const BASE_URL = process.env.REACT_APP_BASE_URL

// Apis for ENDPOINTS
export const endpoints= {
    SEND_OTP_API: BASE_URL + "/userRouter/sendOtp",
    SIGNUP_API: BASE_URL + "/userRouter/sign-up",
    LOGIN_API: BASE_URL + "/userRouter/login",
    RESETPASSTOKEN_API : BASE_URL+"/userRouter/resetPasswordToken",
    RESETPASSWORD_API : BASE_URL+"/userRouter/resetPassword"
}

// profile of user getting ENPOINTS
export const  profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL+"/profile/getAlluserDetails",
    USER_ENROLLED_COURSE_API : BASE_URL+ "/profile/getEnrolledCourses",
}

// updation of the setting at the profile ENPOINTS
export const settingEndpoints = {
    UPDATE_PROFILE_API: BASE_URL+ "/profile/updateProfile",
    DELETE_PROFILE_API: BASE_URL+ "/profile/deleteProfile",
    CHANGE_PASSWORD_API: BASE_URL+ "/userRouter/changePassword",
    UPDATE_PROFILE_PIC_API: BASE_URL+"/profile/updateProfilePic",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

// categories ENDPOINT
export const categories= {
    CATEGORY_API : BASE_URL + "/courseRouter/getAllCategory"
}
// get Categories details page ENDPOINTS
export const getCategory={
    CATEGORY_PAGE_DETAILS_API: BASE_URL + "/courseRouter/CategoryPageDetails"
}

// rating and review ENDPOINT
export const  ratingAndReview = {
    RATING_AND_REVIEW_API: BASE_URL +  "/courseRouter/getAllrating"
}

// student ENDPOINTS 
export const payment_course= {
    COURSE_PAYMENT_API: BASE_URL + "/paymentRouter/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/paymentRouter/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/paymentRouter/sendSuccessPaymentMail",
    
}

// courses ENDPOINTS
export const courseEndpoint={

    CREATE_COURSE_API: BASE_URL+"/courseRouter/createCourse",
    GET_ALL_COURSE_API: BASE_URL+"/courseRouter/getAllcourses",
    GET_COURSE_DETAIL_API: BASE_URL+"/courseRouter/getFullCourseDetails",
//banaye nhi hai
    EDIT_COURSE_API: BASE_URL + "/courseRouter/editCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/courseRouter/updateCourseProgress",
    DELETE_COURSE_API: BASE_URL + "/courseRouter/deleteCourse",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courseRouter/getInstructorCourses",
    //
    
    CREATE_RATING_AND_REVIEW_API: BASE_URL+"/courseRouter/createRatingAndReview",
    GET_ALL_RATING_OF_COURSE_API: BASE_URL+"/courseRouter/getAllratingOfCourse",
    GET_AVG_RATING_API: BASE_URL+"/courseRouter/getAvgRating",
    GET_ALL_RATING_API: BASE_URL+"/courseRouter/getAllrating",
   
    CREATE_CATEGORY_API: BASE_URL+"/courseRouter/createCategory",
   
    CREATE_SECTION_API: BASE_URL+"/courseRouter/createSection",
    UPDATE_SECTION_API: BASE_URL+"/courseRouter/updateSection",
    DELETE_SECTION_API: BASE_URL+"/courseRouter/deleteSection",


    CREATE_SUB_SECTION_API: BASE_URL+"/courseRouter/createSubSection",
    UPDATE_SUB_SECTION_API: BASE_URL+"/courseRouter/updateSubSection",
    DELETE_SUB_SECTION_API: BASE_URL+"/courseRouter/deleteSubSection",

}

export const contact_us={

    CONTACT_US_API: BASE_URL + "/contactUs/contactUsrouter"
}