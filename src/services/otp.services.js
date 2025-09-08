// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const emailUser = process.env.EMAIL_USER;
// const emailPass = process.env.EMAIL_PASS;

// export const sendOtpToEmail = async (email) => {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: emailUser,
//             pass: emailPass 
//         }
//     });

//     await transporter.sendMail({
//         from: emailUser,
//         to: email,
//         subject: "Your OTP Code",
//         text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
//     });

//     return otp;
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export const sendOtpToEmail = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL
        auth: {
            user: emailUser,
            pass: emailPass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: `"Scolage" <${emailUser}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
    });

    return otp;
};
