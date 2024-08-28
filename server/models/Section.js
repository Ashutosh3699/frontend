const mongoose = require("mongoose");

const SectionSchema = new  mongoose.Schema({

    sectionName: {
        type: String,
        required:true
    },
    videoUrl: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required:true,
        trim:true
    }]

})

module.exports = mongoose.model("Section",SectionSchema);