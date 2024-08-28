const mongoose = require("mongoose");

const profileSchema = new  mongoose.Schema({

    phoneNumber: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        enum: ["Male","Female"],
    },
    DOB:{
        type: String,
    },
    aboutUser: {
        type:String,
        trim:true
    }

})

module.exports = mongoose.model("Profile",profileSchema);