const express = require("express");
const userRouter = express.Router();

// fetch the login and signup function
const {sendOtp, signUp, logIn, changePassword} = require("../controllers/AuthController");
const {isAuth} = require("../middleware/Auth");
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// login
userRouter.post("/login",logIn);

// sendotp and signup page
userRouter.post("/sendOtp", sendOtp);

userRouter.post("/sign-up",signUp);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
// forget password
userRouter.post("/resetPasswordToken",resetPasswordToken);
userRouter.post("/resetPassword",resetPassword)


// profile change password
userRouter.post("/changePassword",isAuth, changePassword);


module.exports = userRouter

