const mongoose = require("mongoose");

const categorySchema = new  mongoose.Schema({

    categoryName: {
        type: String,
        required:true
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    description: {
        type:String,
        trim:true
    }

})

module.exports = mongoose.model("Category",categorySchema);