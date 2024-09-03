const User = require("../models/User");
const Profile = require("../models/Profile");
const Courses = require("../models/Courses");
const schedule = require('node-schedule');

// updateProfile as we have created the profile while createUser
exports.updateProfile = async(req,res)=>{

    try {
        // fetch the user id
        const user_id = req.user.id;
        // fetch the data from body
        const {phoneNumber,gender,DOB="",aboutUser=""}   = req.body;
        console.log("user_id", phoneNumber);
        // check  the id and call out the db of user
        if(!phoneNumber || !gender || !DOB || !aboutUser){

            return res.status(400).json({
                success:false,
                message: "Enter the details properly"
            });
        }
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
            }
        );
        // update the profile of the user
        // accountDetailsUser.phoneNumber= phoneNumber;
        // accountDetailsUser.gender = gender;
        // accountDetailsUser.DOB = DOB;
        // accountDetailsUser.aboutUser = aboutUser;

        console.log("updated account details", accountDetailsUser);
        // await accountDetailsUser.save();
        // console.log("updated");
        // return response
        return res.status(200).json({
            success:true,
            message: "account details are updated successfully",
            accountDetailsUser,
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
        const userId = req.user.id
        const userDetails = await User.findOne({
          _id: userId,
        })
          .populate("accountCourses")
          .exec()
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
