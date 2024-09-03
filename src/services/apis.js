
const BASE_URL = process.env.REACT_APP_BASE_URL

// Apis for ENDPOINTS
export const endpoints= {
    SEND_OTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/sign-up",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL+"/auth/resetPasswordToken",
    RESETPASSWORD_API : BASE_URL+"/auth/resetPassword"
}

export const categories= {
    CATEGORY_API : BASE_URL + "/courseRouter/getAllCategory"
}