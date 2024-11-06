const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const htmlpath = path.join(__dirname,'../', 'mail', 'contectUs.html');
const htmlcode = fs.readFileSync(htmlpath, 'utf-8');
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
      user: "support@zenvest.live",
      pass: "PNce1LhipdKK",
  },
});
async function sendEmailContect(e) {
  let htmlTemp = htmlcode.replace('{{name}}', e.name).replace('{{subject}}',e.subject).replace('{{message}}',e.message);
  const mailOptions = {
    from: {
      name: 'ZENVEST',
      address: "support@zenvest.live"
    },
    to: e.email,
    subject: "Thank You for Getting in Touch!",
    html: htmlTemp,
    
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent to:", e.email);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { sendEmailContect };
