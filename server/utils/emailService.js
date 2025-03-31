const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

async function sendEmailWithAttachment(userEmail, userName, userRegNumber, ticketUrl) {
    try {
        // Load HTML template
        let emailHtml = fs.readFileSync(path.join(__dirname, "email_template.html"), "utf8");
        // Replace placeholder with user's name
        const qrData = {
            name: userName,
            regNumber: userRegNumber,
        }
        emailHtml = emailHtml.replace("{{name}}", userName);
        emailHtml = emailHtml.replace("{{qrData}}", JSON.stringify(qrData));
        emailHtml = emailHtml.replace("{{regNumber}}", userRegNumber);
        // Transform Cloudinary URL to fetch PDF version
        const pdfUrl = ticketUrl.replace(".png", ".pdf");
        // Nodemailer Transporter
        let transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: { rejectUnauthorized: false },
        });
        // Email Options
        const mailOptions = {
            from: `"TRADE-A-RITHM" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: "Your TRADE-A-RITHM Ticket",
            html: emailHtml,
            attachments: [
                {
                    filename: "ticket.pdf",
                    path: pdfUrl,
                    contentType: "application/pdf",
                },
            ],
        };
        // Send Email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = {
    sendEmailWithAttachment,
};  
