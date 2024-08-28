const mongoose = require("mongoose");
const mailsender = require("../utils/mailSender");
const otpTemplate = require("../mail/template/emailVerificationTemplate")

const otpSchema = new  mongoose.Schema({

   email: {
        type:String,
        required:true,
   },
   createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60
   },
   otp: {
        type:String,
        required:true
   }

});

async function sendVerification (email,otp) {

     try {
          
          const response = await mailsender(email, "verification code for signup", otpTemplate(otp));
          console.log("response is for verifiaction is ", response);
     } catch (error) {
          
          console.log("error at verification of otp");
          console.error(error);
     }
};

otpSchema.pre("save", async function (next) {
     
     try {
          
          await sendVerification(this.email, this.otp);
         next();
     } catch (error) {
          
          console.log("error at pre save of the otp ", error);
     }
}) 

module.exports = mongoose.model("OTP",otpSchema);