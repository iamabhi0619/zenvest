const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { generateTicket } = require('./GenrateTicket');
const htmlpath = path.join('./', 'emailSend.html');
const htmlcode = fs.readFileSync(htmlpath, 'utf-8');
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
      user: "official@zenvest.live",
      pass: "GXszbNuzqyyU",
  },
});

async function sendEmail(e) {
  let htmlTemp = htmlcode.replace('{{name}}', e.name);
  const base64Ticket = await generateTicket(e);
  const icsPath = path.join(__dirname, 'invitation.ics');
  const icsContent = fs.readFileSync(icsPath, 'utf-8');
  const mailOptions = {
    from: {
      name: 'ZENVEST',
      address: "official@zenvest.live"
    },
    to: e.email,
    subject: "You're In! FINATHON Registration Confirmation 🎟️",
    html: htmlTemp,
    attachments: [
      {
        filename: 'ticket.png',
        content: base64Ticket,
        encoding: 'base64'
      },
      {
        filename: 'invitation.ics',
        content: icsContent,
        contentType: 'text/calendar',
        method: 'request'
      }
    ]
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent to:", e.email);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { sendEmail };
