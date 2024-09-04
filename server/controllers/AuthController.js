const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const Profile  = require("../models/Profile");
const JWT = require("jsonwebtoken");
const mailsender = require("../utils/mailSender");

require("dotenv").config();

// otp generation
exports.sendOtp = async(req,res)=>{
    try {
        // fetching the email
        const  {email} = req.body;
        // validate the email
        if(!email){

            return res.status(400).json({
                success:false,
                message: "Enter a valid emailId"
            })
        }
        // check the user is already exist or not
        const userExistinDb = await User.findOne({email});
        if(userExistinDb){
            return res.status(401).json({
                success:false,
                message: "User is already exist"
            })
        }
        // generate the otp
        let otp =  otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("otp is " , otp);
        let result = await OTP.findOne({otp});
        // check the otp is unique
        while(result){

            otp =  otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({otp});
        }
        // create the otp data in databse and before saving the otp will be send to user

        const data = await OTP.create({
            email,
            otp
        })
        console.log("otp created at db, ", data);
        return res.status(200).json({
            success:true,
            data,
            message: "OTP has been sent successfully"
        })

    } catch (error) {
        
        console.log("error", error);
        return res.status(500).json({
            success:false,
            message: "Error occured while sendOTP"
        })
    }
}

// sign up
exports.signUp =  async(req,res) =>{
    try {
        // fetch data 
        const {email, password, confirmPassword, firstName, lastName, accountType, contactNumber, otp} = req.body
        // validate the data
        if(!email || !password || !confirmPassword || !firstName || !lastName || !otp){
            return res.status(401).json({
                success:false,
                message: "Data is incomplete, please fill all the data"
            })
        }
        // check user is already exist
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(401).json({
                success:false,
                message: "Data is incomplete, please fill all the data"
            })
        }
        // check the password is correct
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message: "password is not matched with confirmPassword"
            })
        }
        // bring the otp from db and check the otp is correct while entering
        const otpDb = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);;
        console.log("otpDb", otpDb);
        if (otpDb.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} 
        else if(otp !== otpDb[0].otp){
            return res.status(401).json({
                success:false,
                message: "OTP is false please enter correct otp"
            })
        }
        // hash the password
        const hashPassword = await bcrypt.hash(password,10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // create the profile & user
        const profile =  await Profile.create({
            gender:null,
            DOB:null,
            phoneNumber:contactNumber,
            aboutUser:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            accountType,
            approved: approved,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            accountDetails:profile._id,
        });

        return res.status(200).json({
            success:true,
            data:user,
            message: "User is signed up successfully",
        })

    } catch (error) {

        console.log("Error at sign up ", error);
        return res.status(500).json({
            success:false,
            message: "User is not signed up, error occured while sign up",
        })
    }
}

// login 
exports.logIn = async(req,res) =>{
    try {
        // fetch data email and password
        const  {email,password} = req.body;
        // validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "enter the details properly",
            })
        }
        const  data = await User.findOne({email}).populate("accountDetails").exec();
        // check password
        const response = await bcrypt.compare(password,data.password);
        if(!response){
            return res.status(401).json({
                success:false,
                message: "Password is wrong, please enter correct password"
            })
        }
        // correct then jwt token and cookies
        try {

            const payload = {
                email : data.email,
                id: data._id,
                accountType: data.accountType,
            }
            const token =  JWT.sign(payload,
                                    process.env.JWT_SECRET,
                                {
                                    expiresIn: "24h"
                                });
            console.log(token);

            // use to_object 
            data.token = token;
            data.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            return res.cookie("token", token, options).status(200).json({

                success:true,
                token,
                data,
                message:"user is loggedin successfully"
            })
        } catch (error) {

            res.status(400).json({
                success:false,
                message:"cookie is not generated successfully"
            })
        }

    } catch (error) {
        console.log("error while login ", error);
        res.status(500).json({
            success:false,
            message:"User can't be log in"
        })
    }
}


// changePassword
exports.changePassword = async(req,res)=>{
    try {
        // fetch data from req body
        const {email,oldPassword,newPassword,confirmPassword} = req.body;
        // compare old password and new password 
        const  user = await User.findOne({email});

        if(!email || !oldPassword || !newPassword || !confirmPassword){

            return res.status(401).json({
                success: false,
                message: "Enter the details properly",
            })
        }

        const response = await bcrypt.compare(oldPassword,user.password);
        if(!response){
            return res.status(401).json({
                success: false,
                message: "Enter the old password correctly",
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Enter the confirm password correctly",
            })
        }
        // hash the new password
        const hashPassword  = await bcrypt.hash(newPassword,10);
        // store the data in db
        const data = await User.findByIdAndUpdate({email},{
            password:hashPassword,
        });
        // send a mail to user
        mailsender(user.email, "updatation of password", "Your password has been changed" )
        // return the response
        return res.status(200).json({
            success:true,
            data,
            message:"Reset of password has been done"
        })

    } catch (error) {
        console.log("error at changing of password ", error);
        return res.status(500).json({
            success:false,
            message:"Reset of password has been failed"
        })
    }
}

