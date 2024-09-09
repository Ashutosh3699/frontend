const express = require("express");
const profileRouter = express.Router();

const {updateProfile, deleteProfile, getAllUserDetails, getEnrolledCourses,updateProfilePic} = require("../controllers/Profile");

// import middlewares
const {isAuth} = require("../middleware/Auth");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
profileRouter.put("/updateProfile", isAuth, updateProfile);
profileRouter.delete("/deleteProfile", isAuth, deleteProfile);
profileRouter.get("/getAlluserDetails", isAuth, getAllUserDetails);
profileRouter.get("/getEnrolledCourses", isAuth,getEnrolledCourses);
profileRouter.put("/updateProfilePic", isAuth,updateProfilePic);

module.exports = profileRouter

