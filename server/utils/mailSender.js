const nodemailer = require("nodemailer");

const mailsender = async (email,title,body)=>{

    try {
        
        const transporter  = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: "ashutosh.bishoi2002@gmail.com",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log("Message sent: ", info);

    } catch (error) {
        
        console.log("Error at transporter of the mail");
        console.error(error);
    }
}

module.exports = mailsender;