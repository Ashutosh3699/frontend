const mailsender = require("../utils/mailSender")

require("dotenv").config();

exports.contactUs = async(req,res)=>{

    try {
        const {firstName, lastName, email,contactNumber, message} = req.body;

        // validate karna hai toh karle
        if(!firstName || !lastName || !email || !contactNumber || !message){
            return res.status(400).json({
                success:false,
                message: "Enter the data properly in the form"
            })
        }
        // send  mail to admin
        const senToAdmin = await mailsender(process.env.MAIL_EMAIL, 
            `Customer have  Query!! please listen to ${firstName} ${lastName}`,  
            `Customer Name: ${firstName}  ${lastName}
                Customer Phone Number: ${contactNumber}
                customer email: ${email}
                query is: ${message}`);
        // send mail to user
        const sentToUser = await mailsender(email, 
            "Query is submitted successfully", 
            `Thank you, dear ${firstName} ${lastName} for your query,  please wait for the response from admin`); 
        // return response
        return res.status(200).json({
            success:true,
            message: "Contact us data has been send successfully",
            data: {senToAdmin,
                sentToUser
            }
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Error occurred, have problem while email sending"
        })
    }
}