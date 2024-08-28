const jwt = require("jsonwebtoken");
require("dotenv").config();
// authentication  for id
exports.isAuth = async(req,res,next) =>{
    try {
        const token =  req.cookies.token || req.body.token ||  req.header("Authorisation").replace("Bearer ", "");

        if(!token || token===undefined){

            res.status(401).json({
                success:false,
                message: "invalid token, token is not provided"
            })
        }
        try {
            
            const payload =  jwt.decode(token,process.env.JWT_SECRET);

            req.user = payload;

        } catch (error) {
            
            console.log("error", error);
            res.status(401).json({
                success:false,
                message: "token is not valid"
            })
        }
        
        next();
    } catch (error) {
        
            console.log("error", error);
            res.status(500).json({
                success:false,
                message: "error found in authentication"
            })
    }
}

// authorization of student
exports.isStudent = async(req,res,next) =>{
    try {
        
        const {accountType} = req.user;

        if(accountType !== "Student"){
            res.status(401).json({
                success:false,
                message: "this is a protected route for only STUDENT"
            })
        }

        next();
    } catch (error) {
        
        console.log("error", error);
            res.status(500).json({
                success:false,
                message: "error found in authorization in student"
            })
    }
}

// authorization of instructor
exports.isInstructor = async(req,res,next) =>{
    try {
        
        const {accountType} = req.user;

        if(accountType !== "Instructor"){
            res.status(401).json({
                success:false,
                message: "this is a protected route for only Instructor"
            })
        }

        next();
    } catch (error) {
        
        console.log("error", error);
            res.status(500).json({
                success:false,
                message: "error found in authorization in Instructor"
            })
    }
}

// authorization of admin
exports.isAdmin = async(req,res,next) =>{
    try {
        
        const {accountType} = req.user;

        if(accountType !== "Admin"){
            res.status(401).json({
                success:false,
                message: "this is a protected route for only Admin"
            })
        }

        next();
    } catch (error) {
        
        console.log("error", error);
            res.status(500).json({
                success:false,
                message: "error found in authorization in Admin"
            })
    }
}