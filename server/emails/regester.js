const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const htmlpath = path.join(__dirname, 'register.html');
const htmlcode = fs.readFileSync(htmlpath,'utf-8');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: "zenvest.official@gmail.com",
      pass: "zasl dbno rlcc irre",
  },
});

async function sendEmail (e) {
  let htmlTemp = htmlcode
  htmlTemp = htmlTemp.replace('{{name}}',e.name)
  const mailOptions = {
    from: {
      name: 'ZENVEST',
      address: "zenvest.official@gmail.com"
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