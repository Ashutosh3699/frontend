const User = require("../models/User");
const Category = require("../models/Categories");
const Courses = require("../models/Courses");
const CourseProgress = require("../models/CourseProgress");
const {fileAndImageUploader}   = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

require("dotenv").config();

exports.createCourse = async (req,res) =>{
    try {
        // fetch file and data
        let  {courseName, courseDetail, price, whatWeWillLearn, tags,category,status , instructions} = req.body;

        const  thumbnail = req.files.thumbnail;
        console.log(req.body);
        console.log(thumbnail);
        if(!courseName || !courseDetail || !price || !whatWeWillLearn 
            || !tags || !thumbnail
             || !category || !status){

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
            tag:tags,
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
            data: response,
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
        const resposne = await Courses.find({status:"Published"},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				reviewAndRating: true,
				studentEnrolled: true,
			}
        )
        .populate("instructor").exec();
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
        const response = await  Courses.findOne({_id:courseId}).populate({ path:"courseContent",
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

exports.editCourseDetails = async(req,res)=>{

    try {
        const { courseId } = req.body
        const updates = req.body;

        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" })
          }

          // If Thumbnail Image is found, update it
          if(req.files){
            console.log("thumbnail update");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await fileAndImageUploader(thumbnail, process.env.FOLDER_NAME);

            course.thumbnail = thumbnailImage.secure_url;
          }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
              if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(updates[key])
              } else {
                course[key] = updates[key]
              }
            }
          }

          await course.save();

          const response = await Courses.findById(courseId).populate({
            path: "instructor",
            populate:{
                path:"accountDetails"
            }
          }).populate("category").
          populate("reviewAndRating").
          populate({
            path:"courseContent",
            populate:{
                path:"videoUrl",
            },
          });

          res.status(200).json({
            success:"true",
            message: "course edited successfully",
            data:response,
          });


    } catch (error) {
        
    }
}

exports.getFullCourseDetails= async(req,res)=>{
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseDetails = await Courses.findOne({_id:courseId})
        .populate({
            path:"instructor",
            populate:{
                path:"accountType",
            }
        }).populate("category")
        .populate("reviewAndRating")
        .populate({
            path:"courseContent",
            populate:{
                path:"videoUrl"
            }
        }).exec();

        let courseProgressCount = await CourseProgress.findOne({
            courseId:courseId,  
            // userId: userId, 
        })

        console.log("courseProgressCount : ", courseProgressCount);

        if (!courseDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            })
          }

          let totalDurationInSeconds = 0;
          courseDetails.courseContent.forEach((content)=>{
            content?.videoUrl?.forEach((subSection)=>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds
            })
          });

          const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

          return res.status(200).json({
            success:true,
            message:" All the detail of course fetched",
            data:{
                courseDetails,
                totalDuration,
                completedVideo: courseProgressCount?.completedVideo
                    ? courseProgressCount?.completedVideo
                    : [],
             }
          });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.getInstructorCourses= async(req,res)=>{

    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id;

        // Find all courses belonging to the instructor
        const instructorCourses = await Courses.find({
            instructor: instructorId
        }).sort({createdAt:-1});

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
            message:"instructor data collected"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
        })
    }
}
// delete course 
exports.deleteCourse= async(req,res)=>{

    try {
        const {courseId} = req.body;

        // fetching the courses
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
          }

          const studentEnrolled = course.studentEnrolled;
          for (const studentId of studentEnrolled) {
            
            await User.findByIdAndUpdate(studentId,{
                $pull:{
                    accountCourses:courseId
                }
            })
          }
        
         // Delete sections and sub-sections
         const courseSection = course.courseContent;
         for (const sectionId of courseSection) {
            
            const section = await Section.findById(sectionId);

            if(section){
                const subSection = section.videoUrl;
                for (const subSectionId of subSection) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            await Section.findByIdAndDelete(sectionId);
         };

         await Courses.findByIdAndDelete(courseId);

         return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
          })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        })
    }
}
