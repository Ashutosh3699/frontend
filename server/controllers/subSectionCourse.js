const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { fileAndImageUploader } = require("../utils/imageUploader");

exports.createSubSection= async(req,res)=>{
    try {
        // fetch the data --> section_id, title, videoDetail, timeDuration
        const {sectionId, title, videoDetail, timeDuration} = req.body;
        // console.log("req is: ", req.body);
        // fetch the file for video
        const video = req.files.video;
        // console.log("video is: ", req.files);
        // validation
        if(!video || !videoDetail || !sectionId || !title ){

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
            timeDuration:`${video_url.duration}`
        });
        // push the obj_id in section
        const  response  = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                videoUrl : subSection_id
            }
        }, {new:true}).populate("videoUrl").exec();
        // response section aa raha hai
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
        const {subSectionId, sectionId, title, videoDetail} = req.body;

        console.log("body is:", req.body);

        const response = await SubSection.findById(subSectionId);

        if(!response){
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
              })
        }

        console.log("response is:", response);
        if(title !==undefined){
            response.title = title;
        }
        if(videoDetail !==undefined){
            response.videoDetail= videoDetail;
        }
        if(req.files && req.files.video !== undefined){
            // fetch the file for video
            const video = req.files.video;
            const video_url = await fileAndImageUploader(video, process.env.FOLDER_NAME);

            response.video = video_url.secure_url;
            response.timeDuration = `${video_url.duration}`
        }
        console.log("response after  is:", response);
 
       await  response.save();


       const result = await Section.findById(sectionId).populate("videoUrl").exec();

        return res.status(200).json({
            success: true,
            data:result,
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
        const {subSectionId, sectionId} = req.body;

        // console.log("res is:", req.body);
         // validate the data
         if(!subSectionId || !sectionId ){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly, all details are not available"
            });
        }

         await Section.findByIdAndUpdate(sectionId,{
            $pull: {
                videoUrl:subSectionId
            }
        },{new:true});

        await SubSection.findByIdAndDelete(subSectionId);

        const result = await Section.findById(sectionId).populate("videoUrl").exec(); 

        return res.status(200).json({
            success:true,
            data:result,
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