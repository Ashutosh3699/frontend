const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpayAuth");
const Courses = require("../models/Courses");
const User =  require("../models/User");
const mailsender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/template/courseEnrolledTemplate");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/template/paymentSuccessEmail");


exports.capturePayment = async(req,res)=>{
    // take the courseid and userid
    const  {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){

        return res.status(404).json({
            success:false,
            message: "Course not found"
        })
    }

    let totalAmount = 0;
    for(const courseId of courses){
        let course;
        try {    
            course = await Courses.findById(courseId);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Course not exists"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                
                res.status(200).json({
                    success:false,
                    message:"Course already exist"
                })
            }
            totalAmount += course.price;

        } catch (error) {
            console.log("error at capture payment: ", error);
            res.status(400).json({
                success:false,
                message: error.message
            })
        }
    }

    const options = {
        amount : totalAmount*100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResposne = await instance.orders.create(options);
        return res.status(200).json({
            success:true,
            message: "order created",
            data:paymentResposne
        })
    } catch (error) {
        console.log("error at payment is: ", error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

// verify payment
exports.verifyPayment= async(req,res)=>{

    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){

        return res.status(200).json({
            success:false,
            message: "Payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("body is:", body);
    const expectedSignature =  crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRETKEY)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){

        // enroll student
        await enrolledStudent(courses,userId,res)
        // return res
        return res.status(200).json({
            success:true,
            message: "Payment is successfull"
        })
    }

    return  res.status(200).json({
        success:false,
        message:"Payment failed"
    })

}


const enrolledStudent= async( courses , userId, res)=>{

    console.log("courses is: ", courses);
    console.log("user is: ", userId);
    if(!courses || !userId){

        return res.status(400).json({
            success:false,
            message:"please provide data for enroll student"
        })
    }

    for(const courseId of courses){
        try {
            // find the course and enrolle the user
            const enrollCourse = await Courses.findByIdAndUpdate(courseId,{
                $push:{
                    studentEnrolled:userId
                },
            },{new:true});

            // console.log("enrolled courses is: ", enrollCourse);
            if(!enrollCourse){
                return res.status(400).json({
                    success:false,
                    message:"course not provided"
                })
            }
            // find the user and encroll the course
            const enrolledUser = await User.findByIdAndUpdate(userId,{
                $push:{
                    accountCourses:courseId
                }
            },{new:true});
            // console.log("enrolled user is: ", enrolledUser);
            if(!enrolledUser){
                return res.status(400).json({
                    success:false,
                    message:"user not provided"
                })
            }

            const emailResponse =await mailsender(
                enrolledUser.email,
                `Successfully enrolled in  ${enrollCourse.courseName}`,
                courseEnrollmentEmail(enrollCourse.courseName,`${enrolledUser.firstName} ${enrolledUser.lastName}` )
            )

            // console.log("email sent successfully", emailResponse);
        } catch (error) {
            
            console.log("error at enroll", error);
            res.status(500).json({
                success:false,
                message:"Error at enrolled courses"
            })
        }
    }

}

exports.sendSuccessPaymentMail= async(req,res)=>{

    // console.log("req body:", req.body);
    const {orderId,amount,paymentId} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailsender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}  ${enrolledStudent.lastName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }

}

// exports.capturePayment = async(req,res)=>{
//     try {
//         // take the courseid and userid 
//         const {course_id} = req.body;
//         const {user_id} = req.user.id;
//         // validation
//             // validate courseid 
//             if(!course_id){
//                 return res.status(401).json({
//                     success:false,
//                     message:"course id is not valid",
//                 })
//             }
//             // validate the user
//             if(!user_id){
//                 return res.status(401).json({
//                     success:false,
//                     message:"user is not valid, try again later",
//                 })
//             }
//         // check that the course is not present in user courses
//         const userAccount = await User.findById(user_id);
//         if(userAccount.accountCourses.includes(course_id)){

//             return res.status(200).json({
//                 success:false,
//                 message: "User already have the course",
//             })
//         }
//         // create an option
//         const course = await Courses.findById(course_id);
//         const amount =  course.price * 100;
//         const currency = "INR";
//         const options = {
//             amount,
//             currency,
//             receipt: Math.random(Date.now()).toString() ,
//             notes: {
//                 courseId : course_id,
//                 userId: user_id
//             }
//         }
//         // create the order
//         try {
//             const paymentResposne = await instance.orders.create(options);
//             console.log(paymentResposne);
//             // return response
//             return res.status(200).json({
//                 success:true,
//                 message: "payment is in processed...",
//                 courseName: course.courseName,
//                 courseDescription: course.courseDetail,
//                 thumbnail: course.thumbnail,
//                 receipt: paymentResposne.id,
//                 currency: paymentResposne.currency,
//                 amount: paymentResposne.amount
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message:"Error occured while the payment"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             error:error.message,
//             message:"capture payment error occured"
//         })
//     }
// }

// exports.verifySignature= async(req,res)=>{

//     const webhookSecret = "12345678";
//     const signature = req.headers("x-razorpay-signature");
//     // hashing the webhook using crypto
//     const shasum = await crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     // verify the secret key
//     if(digest === signature){
//         console.log("payment is authorised....");
//         const {courseId, userId}  =  req.body.payload.payment.entity.notes;
//         // three step process
//         try {
//             // 1. course me user ko push karna hai
//             const enrollCourse = await Courses.findOneAndUpdate({_id:courseId},
//                 {
//                     $push: {studentEnrolled:userId}
//                 },
//                 {new:true}
//             )
//             // 2. user me course ko push karne hai
//             const enrollStudent = await User.findOneAndUpdate({_id:userId},
//                 {
//                     $push:{accountCourses:courseId}
//                 },
//                 {new:true}
//             );
//             // 3. mail send karo user ko
//             const sendEmail = await mailsender(
//                 enrollStudent.email,
//                 "Student enrollment in the course",
//                 `The student name: ${enrollStudent.firstName}  ${enrollStudent.lastName}  course: ${enrollCourse.courseName}`
//             )
//             console.log(sendEmail);
//             return res.status(200).json({
//                 success:true,
//                 message: "the email has sent to your account"
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message: "Error occured while enrollment of course, contact to our services"
//             })
//         }
//     }
//     else{
//         return res.status(500).json({
//             success:false,
//             message: "verification of the webhook is not valid"
//         })
//     }
// }