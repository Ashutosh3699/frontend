const  User = require("../models/User");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetpasswordToken
exports.resetPasswordToken = async(req,res) =>{

    try {
        // fetch the email
        const {email} = req.body;
        // validation
        if(!email){
            return res.status(401).json({
                success:false,
                message: "enter an  valid email"
            })
        }

        const response = await User.findOne({email});
        console.log("email", email);

        if(!response){
            return res.status(401).json({
                success:false,
                message: "Email id is not registered"
            })
        } 
         // generate the token
            const token = crypto.randomBytes(20).toString("hex");
        // insert the token in db  with resetTokenexpire
            const data = await User.findOneAndUpdate({email:email},{
                token:token,
                resetTokenexpires: Date.now() + 5*60*1000,
            },{new:true}
        )
        // create url
            const url = `http://localhost:3000/update-password/${token}`
        // send the url to the user email
            await mailsender(email,"Link for forgot password" , `Password Reset Link: ${url}`);

            return res.status(200).json({
                success: true,
                data,
                message: "Link to change password has been send to your email"
            })

    } catch (error) {
        
        console.log("error  ", error);
        return res.status(500).json({
            success:false,
            message: "Error while sending the password change mail to the Email id"
        })
    }
}

// restpassword
exports.resetPassword = async(req,res) =>{
    try {
        // fetch the token, password,confirmpassword
        const {token, password,confirmPassword} = req.body;
        // check the token in db and validate the token
        console.log("token", token);

        if(!password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message: "enter a valid password"
            })
        }
        // bring the user from the db  and check the time 
        const response = await User.findOne({token});

        //if no entry - invalid token
        if(!response) {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        console.log("response1", response);
        if(response.resetTokenexpires < Date.now()){
            return res.status(401).json({
                success:false,
                message: "Link have been expired please try again",
            })
        }
        console.log("response2", response.resetTokenexpires);
        // check the password and confirm password
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message: "enter a  valid confirm password"
            })
        }
        // hash the password
        const hashPassword = await bcrypt.hash(password,10);
        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashPassword},
            {new:true},
        );

        res.status(200).json({
            success:true,
            message: "Forget password  is successfull"
        })

    } catch (error) {
        console.log("error  ", error);
        return res.status(500).json({
            success:false,
            message: "Error while forgot password"
        })
    }
}