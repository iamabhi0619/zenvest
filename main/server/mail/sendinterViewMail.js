const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const user = require("../model/user");
const htmlpath = path.join("./", "InterView.html");
const htmlcode = fs.readFileSync(htmlpath, "utf-8");

async function main() {
  await mongoose.connect(
    "mongodb+srv://zenvestofficial:jeglHTfnySaq5LB7@zenvest-cluster0.vqxmhdq.mongodb.net/zenvest"
  );
  console.log("Database connected...!");
}
main().catch((err) => {
  console.log(err);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "zenvest.official@gmail.com",
    pass: "zasl dbno rlcc irre",
  },
});
async function sendEmail(e) {
  let htmlTemp = htmlcode;
  htmlTemp = htmlTemp.replace("{{name}}", e.name);
  const mailOptions = {
    from: {
      name: "ZENVEST",
      address: "zenvest.official@gmail.com",
    },
    to: e.email,
    subject: "Join the ZENVEST Inner Circle.!",
    html: htmlTemp,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent to:- ", e.email);
  } catch (err) {
    console.log(err);
  }
}
const findUser = async () => {
  const users = await user.find();
  for (let i = 0; i < users.length; i++) {
    if (users[i].status === 1) {
      await sendEmail(users[i]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

findUser();
