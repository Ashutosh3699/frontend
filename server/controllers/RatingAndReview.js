const RatingAndReview = require("../models/RatingAndReview");
const Courses = require("../models/Courses");
const User = require("../models/User");
const mongoose  = require("mongoose");
// creteRating
exports.createRatingandReview = async(req,res)=>{

    try {
        // ftech the user id
        const userId = req.user.id;
        // fetch the courseid and rating details
        const {courseId, rating, review} = req.body;
        // check the user is enrolled in the course

        // *******************another method is****************
        // const  userNotEnrolled = await Courses.findOne({
        //     _id:courseId,
        //     studentEnrolled: {$elemMatch: {$eq: userId}}
        // })
        // ***********************************************
        const checkUserEnrolled = await Courses.findById(courseId).populate("reviewAndRating").exec();
        if(!checkUserEnrolled.studentEnrolled.includes(userId)){

            return res.status(404).json({
                success:false,
                message: "User is not enrolled in the course"
            })
        }
        // check user already have the review in the 
        const alreadyReview = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        });
        if(alreadyReview){
            return res.status(403).json({
                success:false,
                message: "user has already review the course"
            })
        }
        // create the review
        const createRating = await RatingAndReview.create({
            user:userId,
            rating,
            review,
            course:courseId
        })

        // push the rating and review in the course
        const response = await Courses.findByIdAndUpdate(courseId,{
            $push: {reviewAndRating: createRating._id}
        },{new:true});
        // return response
        return res.status(200).json({
            success:true,
            message: "rating is created successfully"
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message: "error occured while creating the rating"
        })
    }
};
// getAllratingOfCourse
exports.getAllratingOfCourse = async(req,res)=>{
    try {
        // fetch the course id 
        const {courseId} = req.body;
        // find the course data nd populate in it
        const response = await Courses.findById(
            {_id:courseId}   
        ).populate({
            path: "reviewAndRating",
            select: "Rating Review",
            populate: {
                path:"user"
            }
        }).exec();
        // return response
        return res.status(200).json({
            success:true,
            message: "course details provided",
            data:response
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message: "error occured while getting the course"
        })
    }
}

// getAvgRating
exports.getAvgRating= async(req,res)=>{
    try {
         // fetch the course id 
         const {courseId} = req.body;
         
        //  calculate average rating of the course
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId) //**************************object id is deprecreated ***************/
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {
                        $avg: "Rating"
                    }
                }
            }
        ]);

        if(result.length() > 0){
            return res.status(200).json({
                success:true,
                message: "Average rating fetched successfully",
                averageRating:result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message: "Average rating of the course is done successfully",
            averageRating:0
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message: "Error occured while getting average response", 
            error: error.message
        })
    }
}

exports.getAllrating= async(req,res)=>{
    try {
        
        // fetch all the rating and review with user and coursedetails
        const result = await RatingAndReview.find({})
            .sort({rating: "desc"})
            .populate({
                path:"user",
                select: "firstName lastName  email  image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();
        
        if(!result){
            return res.status(404).json({
                success:false,
                message: "rating and review not available yet",
            })
        }

        return res.status(200).json({
            success:true,
            result,
            message: "review and rating fetched successfully"
        })

    } catch (error) {
        
        return  res.status(500).json({
            success: false,
            message: "review and rating failed , error occured",
            error: error.message
        })
    }
}