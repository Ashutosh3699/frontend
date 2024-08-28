const mongoose = require("mongoose");

const SubsectionSchema = new  mongoose.Schema({

    title:{
        type:String,
    },
    videoDetail: {
        type:String, 
        trim:true
    },
    video: {
        type:String
    },
    timeDuration: {
        type:String
    }

})

module.exports = mongoose.model("SubSection",SubsectionSchema);