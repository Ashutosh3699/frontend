const mongoose = require("mongoose");

const reviewAndRatingSchema = new  mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Rating: {
        type:Number,
        required:true,
    },
    Review: {
        type:String,
        required:true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},

})

module.exports = mongoose.model("ReviewAndRating",reviewAndRatingSchema);