const mongoose = require("mongoose");

const courseSchema = new  mongoose.Schema({

  courseName: {
        type: String,
        required:true,
        trim:true
  },
  courseDetail: {
    type:String,
    required:true
  },
  thumbnail: {
    type:String,
    required:true
  },
  price: {
    type: String,
    required:true,
  },
  whatWeWillLearn: {
    type:String,
    trim:true
  },
  //************** */ status wali chijj karni hai***************
  courseContent: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  }],
  category: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
  },
  studentEnrolled: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }],
  instructor: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  reviewAndRating: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "ReviewAndRating",
  }],
  tag: {
    type:String,
    trim:true
  },
  	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},


})

module.exports = mongoose.model("Course",courseSchema);