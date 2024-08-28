const User = require("../models/User");
const Category = require("../models/Categories");
const Courses = require("../models/Courses");
const {fileAndImageUploader}   = require("../utils/imageUploader");

require("dotenv").config();

exports.createCourse = async (req,res) =>{
    try {
        // fetch file and data
        const {courseName, courseDetail, price, whatWeWillLearn, tag,category,status , instructions} = req.body;

        const  thumbnail = req.files.thumbnail;
        console.log(req.body);
        console.log(thumbnail);
        if(!courseName || !courseDetail || !price || !whatWeWillLearn || !tag || !thumbnail || !category){

            return res.status(400).json({
                success:false,
                message: "Enter all the details",
            });
        }
        // *************** status wali chijj reh gai hai ********
        // status = "Draft";
  
        // check the instructor dont require a db call as we will get the instructor id only
        const instructor_id = req.user.id;

        console.log("instructor id is: ",instructor_id);
        // check the tag is aviable or not
        const categoryIsAvailable = await Category.findById(category);

        if(!categoryIsAvailable){

            return res.status(404).json({
                success:false,
                message: "Category is not available"
            });
        }
        console.log("category is available", categoryIsAvailable);
        // image uploading
        const imageURL = await fileAndImageUploader(thumbnail, process.env.FOLDER_NAME);

        console.log("image url is : ", imageURL.secure_url);

        if(!imageURL){
            return res.status(404).json({
                success:false,
                message: "Image uploading is not available"
            });
        }

        // create a payload and enter in course db
        const response = await Courses.create({
            courseName,
            courseDetail,
            whatWeWillLearn,
            price,
            thumbnail:imageURL.secure_url,
            category: categoryIsAvailable._id,
            instructor:instructor_id,
            tag:tag,
            status: status,
			instructions: instructions,
        });

        console.log("course created: ", response);
        // take the output or not check here
        await Category.findByIdAndUpdate({_id:category}, {
            $push: {course: response._id}
        },
        {new:true});

        await User.findByIdAndUpdate(instructor_id, {
           $push: { accountCourses: response._id}
        },
        {new:true})
        
        return res.status(200).json({
            success:true,
            message: "Course is created successfully",
        })
        
    } catch (error) {
        
        console.log("Error at creating course , ", error);
        return res.status(500).json({
            success:false,
            error: error.message,
            message: "Course is NOT created ",
        })
    }
}

exports.getAllcourses = async(req,res) =>{
    try {
        // fetching the data from db and try another method
        const resposne = await Courses.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				reviewAndRating: true,
				studentEnrolled: true,
			}
        );
        // populate and exec wala part baki hai
        return res.status(500).json({
            success:true,
            message:"Courses fetched successfully",
            data:resposne
        })
    } catch (error) {
        
        console.log("Error at getting course , ", error);
        return res.status(500).json({
            success:false,
            error: error.message,
            message: "Error occured while fetching the data ",
        })
    }
}

// get course details
exports.getCourseDetails = async(req,res)=>{
    try {
        // fetch the courseid and if any thing is required
        const {courseId} = req.body;
        // db call and get the detail 
        const response = await  Courses.findById({_id:courseId}).populate({ path:"courseContent",
            populate:{path:"videoUrl"}
        })
        .populate({path: "instructor",
            populate: {path:"accountDetails"}
        })
        .populate({path: "reviewAndRating" 
        })
        .populate({ path:"category",
            select: "categoryName description"
        })
        .exec();
        // return response
        return res.status(200).json({
            success:true,
            message: "Course details successfully  done",
            data:response,
        })
    } catch (error) {
        return  res.status(500).json({
            success:false,
            message: "Error occured, Course details is not sent"
        })
    }
}