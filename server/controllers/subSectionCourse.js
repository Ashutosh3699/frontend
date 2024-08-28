const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { fileAndImageUploader } = require("../utils/imageUploader");

exports.createSubSection= async(req,res)=>{
    try {
        // fetch the data --> section_id, title, videoDetail, timeDuration
        const {section_id, title, videoDetail, timeDuration} = req.body;
        // fetch the file for video
        const video = req.files.videoFile;
        // validation
        if(!video || !videoDetail || !section_id || !title || !timeDuration){

            return res.status(401).json({
                success:false,
                message: "Enter the details properly, incorrect fill of data"
            })
        }
        // get secured_url
        // console.log("first");
        const video_url = await fileAndImageUploader(video, process.env.FOLDER_NAME);
        console.log("video: ", video_url.secure_url);
        // create sub-section in db
        const subSection_id = await SubSection.create({
            title,
            videoDetail,
            video:video_url.secure_url,
            timeDuration
        });
        // push the obj_id in section
        const  response  = await Section.findByIdAndUpdate(section_id, {
            $push: {
                videoUrl : subSection_id
            }
        }, {new:true});
        // response
        return res.status(200).json({
            success: true,
            data:response,
            message: "created sub-section successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error occured while creating sub-section",
            error:error.message
        })
    }
};

// updateSubSection
exports.updateSubSection = async(req,res)=>{
    try {
        // fetch the data 
        const {subSection_id, title, videoDetail, timeDuration} = req.body;
        // fetch the file for video
        const video = req.files.videoFile;
        // check the validation

        console.log(video);
        if(!video || !videoDetail || !title || !timeDuration || !subSection_id){

            return res.status(401).json({
                success:false,
                message: "Enter the details properly, incorrect fill of data"
            })
        }
         // get secured_url
         console.log("first");
         const video_url = await fileAndImageUploader(video, process.env.FOLDER_NAME);
         console.log(video_url);
        // then update in db
        const response = await SubSection.findByIdAndUpdate(subSection_id, {
            title:title,
            timeDuration,
            videoDetail,
            video:video_url.secure_url
        });
        // return response
        return res.status(200).json({
            success: true,
            data:response,
            message: "updation of sub-section successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error occured while updating sub-section",
            error:error.message
        })
    }
}

// deleteSubSection
exports.deleteSubSection = async(req,res)=>{
    try {
        // fetch the subsection id using params
        const {subSection_id} = req.body;
         // validate the data
         if(!subSection_id ){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }

        await SubSection.findByIdAndDelete(subSection_id);

        return res.status(200).json({
            success:true,
            message: "sub-section is deleted successfully"
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occured while deleting sub-section",
        })
    }
}