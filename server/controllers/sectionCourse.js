const  Course = require("../models/Courses");
const Section = require("../models/Section");

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
        const {section_id,sectionName } = req.body;
        // validate the data
        if(!sectionName || !section_id){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }
        // update the section in db
        await Section.findByIdAndUpdate(section_id, {sectionName:sectionName}, {new:true});

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
        const {section_id } = req.params;
        // validate the data
        if(!section_id ){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }
        // delete the section
        await Section.findByIdAndDelete(section_id);
        // Deleting the object ID from the parent schema could lead to data inconsistencies and potential errors
        //  Each document in MongoDB has a unique object ID. This means that even if you delete the child entity, the object ID in the parent schema will still be unique and valid.
        return res.status(200).json({
            success:true,
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