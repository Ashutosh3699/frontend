const mongoose = require("mongoose");

const profileSchema = new  mongoose.Schema({

    phoneNumber: {
        type:String,
    },
    gender: {
        type:String,
        enum: ["Male","Female","Others"],
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