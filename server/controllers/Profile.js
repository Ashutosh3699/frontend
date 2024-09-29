const User = require("../models/User");
const Profile = require("../models/Profile");
const Courses = require("../models/Courses");
const schedule = require('node-schedule');
const { fileAndImageUploader } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

require("dotenv").config();

// updateProfile as we have created the profile while createUser
exports.updateProfile = async(req,res)=>{

    try {
        // fetch the user id
        const user_id = req.user.id;
        // fetch the data from body
        const {phoneNumber="",gender,DOB="",aboutUser=""}   = req.body;
        console.log("user_id", phoneNumber);
        
        // db call for user
        const userDetails = await User.findById(user_id);
        console.log("userDetails", userDetails);
        // call the profile of the user
        const accountDetailsUser = await Profile.findByIdAndUpdate(userDetails.accountDetails,
            {
                phoneNumber,
                gender,
                DOB,
                aboutUser
            },
            {new:true}
        );
        // update the profile of the user
        // accountDetailsUser.phoneNumber= phoneNumber;
        // accountDetailsUser.gender = gender;
        // accountDetailsUser.DOB = DOB;
        // accountDetailsUser.aboutUser = aboutUser;

        console.log("updated account details", accountDetailsUser);
        userDetails.accountDetails = accountDetailsUser;
        // await accountDetailsUser.save();
        // console.log("updated");
        // return response
        return res.status(200).json({
            success:true,
            message: "account details are updated successfully",
            data:userDetails
           
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message: "Error occured, account details are not updated"
        })
    }
}

// deleteProfile
exports.deleteProfile = async(req,res)=>{
    try {
        // fetch the user id
        const user_id = req.user.id;
        // db call for user
        const userDetails = await User.findById(user_id);
        // ************************************************
        // ERROR MAY OCCUR HERE CHECK HERE CAREFULLY  **********************//
        // Schedule account deletion after 4-5 days
        const delay = Math.random() * (5 - 4) + 4; // Random delay between 4 and 5 days
        const delayInMilliseconds = delay * 24 * 60 * 60 * 1000;

        schedule.scheduleJob(new Date(Date.now() + delayInMilliseconds), async () => {
             // call the profile of the user and delete the profile
            await Profile.findByIdAndDelete({_id:userDetails.accountDetails});
            //  HW: delete the id of the user from the courses he have enrolled
            // delete the user also
            await User.findByIdAndDelete({_id: user_id});
        });

        
       
        return res.status(200).json({
            success:true,
            message: "Account have deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Account have not deleted , try again later",
            error: error.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("accountDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getEnrolledCourses = async(req,res)=>{
    try {

        // console.log("user id is: ",req.user.id);
        const userId = req.user.id
        const userDetails = await User.findOne({
          _id: userId,
        })
          .populate({
            path:"accountCourses",
            populate:{
                path:"courseContent",
                populate:"videoUrl"
            }
          })
          .exec();

        //   console.log("user Details is; ", userDetails);
        let newUser = userDetails.toObject();
        var SubsectionLength = 0
	  for (var i = 0; i < newUser.accountCourses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < newUser.accountCourses[i].courseContent.length; j++) {

		  totalDurationInSeconds += newUser.accountCourses[i].courseContent[j].
          videoUrl.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);

        //   console.log("total duration is: ", totalDurationInSeconds);

		  newUser.accountCourses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds )
        //   console.log("new course total durTION", newUser.accountCourses[i].totalDuration)
		  SubsectionLength +=
          newUser.accountCourses[i].courseContent[j].videoUrl.length;
        //   console.log("SubsectionLength is       ", SubsectionLength);

		}
		let courseProgressCount = await CourseProgress.findOne({
            courseId: userDetails.accountCourses[i]._id,
            userId
        })

        // console.log("courseProgressCount is       ", courseProgressCount);
		courseProgressCount = courseProgressCount?.completedVideo.length
        console.log("courseProgressCount is   after     ", courseProgressCount);

		if (SubsectionLength === 0) {
            newUser.accountCourses[i].progressPercentage = 100;
            console.log("progressPercentage is : ",  newUser.accountCourses[i].progressPercentage)
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
          newUser.accountCourses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier

            console.log("progressPercentage is : ",  newUser.accountCourses[i].progressPercentage)
		}
	  }
  
      console.log("final response us :", newUser.accountCourses);

        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: newUser.accountCourses,
          message:"user enrolled courses"
        })
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

// update the photo
exports.updateProfilePic = async(req,res)=>{

    try {

        const image = req.files.image;
        console.log("image is : ", image);

        if(!image){

            res.status(401).json({
                success:false,
                error:error.message,
                message:"image not  found"
            })
        }

        const userId = req.user.id;
        console.log("user id is: ", userId);

        const imageUrl = await fileAndImageUploader(image,process.env.FOLDER_NAME);
        console.log("image url is : ", imageUrl.secure_url);

        if(!imageUrl){
            return res.status(404).json({
                success:false,
                message: "Image uploading is not uploaded at 1"
            });
        }

        const response = await User.findByIdAndUpdate(userId,
            {
                image:imageUrl.secure_url
            },
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
            data:response
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error occured, uploading the profile and not updated"
        })
    }
}
