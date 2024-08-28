const {instance} = require("../config/razorpayAuth");
const Courses = require("../models/Courses");
const User =  require("../models/User");
const mailsender = require("../utils/mailSender");

exports.capturePayment = async(req,res)=>{
    try {
        // take the courseid and userid 
        const {course_id} = req.body;
        const {user_id} = req.user.id;
        // validation
            // validate courseid 
            if(!course_id){
                return res.status(401).json({
                    success:false,
                    message:"course id is not valid",
                })
            }
            // validate the user
            if(!user_id){
                return res.status(401).json({
                    success:false,
                    message:"user is not valid, try again later",
                })
            }
        // check that the course is not present in user courses
        const userAccount = await User.findById(user_id);
        if(userAccount.accountCourses.includes(course_id)){

            return res.status(200).json({
                success:false,
                message: "User already have the course",
            })
        }
        // create an option
        const course = await Courses.findById(course_id);
        const amount =  course.price * 100;
        const currency = "INR";
        const options = {
            amount,
            currency,
            receipt: Math.random(Date.now()).toString() ,
            notes: {
                courseId : course_id,
                userId: user_id
            }
        }
        // create the order
        try {
            const paymentResposne = await instance.orders.create(options);
            console.log(paymentResposne);
            // return response
            return res.status(200).json({
                success:true,
                message: "payment is in processed...",
                courseName: course.courseName,
                courseDescription: course.courseDetail,
                thumbnail: course.thumbnail,
                receipt: paymentResposne.id,
                currency: paymentResposne.currency,
                amount: paymentResposne.amount
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error occured while the payment"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"capture payment error occured"
        })
    }
}

exports.verifySignature= async(req,res)=>{

    const webhookSecret = "12345678";
    const signature = req.headers("x-razorpay-signature");
    // hashing the webhook using crypto
    const shasum = await crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    // verify the secret key
    if(digest === signature){
        console.log("payment is authorised....");
        const {courseId, userId}  =  req.body.payload.payment.entity.notes;
        // three step process
        try {
            // 1. course me user ko push karna hai
            const enrollCourse = await Courses.findOneAndUpdate({_id:courseId},
                {
                    $push: {studentEnrolled:userId}
                },
                {new:true}
            )
            // 2. user me course ko push karne hai
            const enrollStudent = await User.findOneAndUpdate({_id:userId},
                {
                    $push:{accountCourses:courseId}
                },
                {new:true}
            );
            // 3. mail send karo user ko
            const sendEmail = await mailsender(
                enrollStudent.email,
                "Student enrollment in the course",
                `The student name: ${enrollStudent.firstName}  ${enrollStudent.lastName}  course: ${enrollCourse.courseName}`
            )
            console.log(sendEmail);
            return res.status(200).json({
                success:true,
                message: "the email has sent to your account"
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: "Error occured while enrollment of course, contact to our services"
            })
        }
    }
    else{
        return res.status(500).json({
            success:false,
            message: "verification of the webhook is not valid"
        })
    }
}