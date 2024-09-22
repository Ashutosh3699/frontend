const  Course = require("../models/Courses");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection")

exports.createSection = async(req,res) =>{

    try {
        // fetch the data (name & courseId)
        const {sectionName,courseId } = req.body;
        // validate the data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }
        // create in DB
        const section_id = await Section.create({sectionName:sectionName});
        // push in course
        const response = await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:section_id
            }
        },{new:true})
        .populate({path:"courseContent",
            populate:{path:"videoUrl"}
        }).exec();
        // how to populate and getting section/subsection in the updatedCourseDetail

        return res.status(200).json({
            success: true,
            data:response,
            message: "created section successfully",
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occured while creating section",
        })
    }
};

exports.updateSection = async(req,res)=>{

    try {
        // fetch the data and courseid
        const {sectionId,sectionName,courseId } = req.body;
        console.log("req is: ", req.body);
        // validate the data
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }
        // update the section in db
         await Section.findByIdAndUpdate(sectionId, {sectionName:sectionName}, {new:true});

        // pass the course as result
        const  response = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"videoUrl"
            }
        }).exec();

        // return the response
        return res.status(200).json({
            success: true,
            data:response,
            message: " section is updated successfully",
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occured while updating section",
        })
    }
};

exports.deleteSection = async(req,res)=>{

    try {
        // fetch the data and courseid
        const {sectionId , courseId} = req.body;
        // validate the data
        if(!sectionId || !courseId ){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }
        // remove the section from course
        await Course.findByIdAndUpdate(courseId,{
            $pull : {
                courseContent:sectionId,
            }
        })

        const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);

        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        // delete the sub section
        await SubSection.deleteMany({_id: {$in: section.videoUrl}})
        
        await Section.findByIdAndDelete(sectionId);

        const result = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path:"videoUrl"
            }
        }).exec()
     
        return res.status(200).json({
            success:true,
            data:result,
            message: " section is deleted successfully"
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occured while deleting section",
        })
    }
}