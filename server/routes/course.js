const express = require("express");
const courseRouter = express.Router();

const {createCourse,getAllcourses,getCourseDetails,
    getFullCourseDetails,getInstructorCourses,deleteCourse,
    editCourseDetails } = require("../controllers/course");
const {createCategory, getAllCategory, CategoryPageDetails} = require("../controllers/Category");
const {createRatingandReview, getAllratingOfCourse, getAvgRating, getAllrating} = require("../controllers/RatingAndReview");
const {createSection,updateSection,deleteSection} = require("../controllers/sectionCourse");
const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/subSectionCourse");

// import middleware for auth
const {isAuth, isStudent, isInstructor, isAdmin} = require("../middleware/Auth");

// creating all the router for courses
courseRouter.post("/createCourse",isAuth,isInstructor, createCourse);
// Get all Registered Courses
courseRouter.get("/getAllcourses",  getAllcourses);
// Get Details for a Specific Courses
courseRouter.post("/getCourseDetails",  getCourseDetails);
// Get Details for a Specific Courses
courseRouter.post("/getFullCourseDetails", isAuth ,getFullCourseDetails);
// Edit Course routes
courseRouter.post("/editCourseDetails",isAuth, isInstructor, editCourseDetails);
// Get all Courses Under a Specific Instructor
courseRouter.get("/getInstructorCourses", isAuth, isInstructor,getInstructorCourses);
// Delete a Course
courseRouter.delete("/deleteCourse", isAuth, isInstructor, deleteCourse);

// creating all the router for rating and review
courseRouter.post("/createRatingAndReview",isAuth,isStudent, createRatingandReview);

courseRouter.get("/getAllratingOfCourse", getAllratingOfCourse);

courseRouter.get("/getAvgRating", getAvgRating);

courseRouter.get("/getAllrating", getAllrating);

// creating all the routers for category
courseRouter.post("/createCategory",isAuth,isAdmin, createCategory);

courseRouter.get("/getAllCategory", getAllCategory);

courseRouter.post("/CategoryPageDetails", CategoryPageDetails);

// creating all the router for courses sections
courseRouter.post("/createSection",isAuth,isInstructor, createSection);

courseRouter.post("/updateSection", isAuth,isInstructor, updateSection);

courseRouter.delete("/deleteSection",isAuth,isInstructor, deleteSection);

// creating all the router for sub section
courseRouter.post("/createSubSection",isAuth,isInstructor, createSubSection);

courseRouter.post("/updateSubSection", isAuth,isInstructor, updateSubSection);

courseRouter.delete("/deleteSubSection",isAuth,isInstructor, deleteSubSection);

module.exports = courseRouter;