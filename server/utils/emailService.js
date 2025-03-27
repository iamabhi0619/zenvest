const nodemailer = require("nodemailer");
const logger = require("../service/logging");

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
    } catch (err) {
        logger.error("Email error:", err);
    }
};

module.exports = sendEmail;