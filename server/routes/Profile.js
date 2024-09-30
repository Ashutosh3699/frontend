const express = require("express");
const profileRouter = express.Router();

const {updateProfile, deleteProfile, getAllUserDetails, getEnrolledCourses,updateProfilePic, instructorDashboard} = require("../controllers/Profile");

// import middlewares
const {isAuth, isInstructor} = require("../middleware/Auth");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
profileRouter.put("/updateProfile", isAuth, updateProfile);
profileRouter.delete("/deleteProfile", isAuth, deleteProfile);
profileRouter.get("/getAlluserDetails", isAuth, getAllUserDetails);
profileRouter.get("/getEnrolledCourses", isAuth,getEnrolledCourses);
profileRouter.put("/updateProfilePic", isAuth,updateProfilePic);
profileRouter.get("/instructorDashboard", isAuth, isInstructor, instructorDashboard);

module.exports = profileRouter

