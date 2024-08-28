const  mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DATABASE is connected successfully");
    })
    .catch((error) => {
        console.log("Error found in Database connectivity");
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnect;