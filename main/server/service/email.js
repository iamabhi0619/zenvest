const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const htmlpath = path.join('./','mail', 'newRegistration.html');
const htmlcode = fs.readFileSync(htmlpath,'utf-8');
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
      user: "hr@zenvest.live",
      pass: "eKi98kur08h3",
  },
});
async function sendEmail (e) {
  let htmlTemp = htmlcode
  htmlTemp = htmlTemp.replace('{{name}}',e.name)
  const mailOptions = {
    from: {
      name: 'ZENVEST',
      address: "hr@zenvest.live"
    },
    to: e.email,
    subject: "Thank You for Registering as a Member of Zenvest LPU!",
    html: htmlTemp,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent to:- ",e.email);
  } catch (err) {
    console.log(err);
  }
}
exports.sendEmail = sendEmail;