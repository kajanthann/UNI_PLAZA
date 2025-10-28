import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({ from: process.env.EMAIL_SENDER, to, subject, text });
};

export default sendEmail;
