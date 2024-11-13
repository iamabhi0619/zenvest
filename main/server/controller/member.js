const { Member } = require("../model/member.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../service/jwttoken.js");
// const { generatePassword } = require("../service/passwordReset.js");
// const { sendEmail } = require("../service/emailpassword.js");

exports.createCoreMember = async (req, res) => {
  try {
    const { id, name, image, post, socialLinks, email, password } = req.body;
    if (!id || !name || !email || !password || !image) {
      return res.status(400).json({ status: "ERROR", message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdMember = new Member({
      id,
      name,
      image,
      post,
      socialLinks,
      email,
      password: hashedPassword,
    });
    const savedMember = await createdMember.save();
    res.status(201).json({ status: "OK", user: savedMember });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ status: "ERROR", message: "An error occurred while creating the member" });
  }
};
exports.createMember = async (req, res) => {
  try {
    const { id, name, post, password } = req.body;
    if (!id || !name || !post || !password) {
      return res.status(400).json({ status: "ERROR", message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdMember = new Member({
      id,
      name,
      post,
      email: id,
      password: hashedPassword,
    });
    const savedMember = await createdMember.save();
    res.status(201).json({ status: "OK", user: savedMember });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ status: "ERROR", message: "An error occurred while creating the member" });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const id  = req.user.id;
    console.log(req.params);
    const memberfound = await Member.findOne({ id });
    if (!memberfound) {
      return res.status(404).json({ status: "ERROR", message: "Member not found" });
    }
    res.status(200).json({ status: "OK", data: memberfound });
  } catch (error) {
    console.error("Error retrieving member details:", error);
    res.status(500).json({ status: "ERROR", message: "Server error" });
  }
};

exports.getAllMember = async (req, res) => {
  try {
    const members = await Member.find({}, { password: 0 }).sort({ _id: -1 });
    res.status(200).json({ status: "OK", user: members });
  } catch (error) {
    console.error("Error getting members:", error);
    res.status(500).json({ status: "ERROR", message: "An error occurred while retrieving members" });
  }
};

exports.loginMember = async (req, res) => {
  try {
    const { id, password } = req.body;
    const memberfound = await Member.findOne({ id });
    if (!memberfound) {
      return res.status(401).json({ status: "ERROR", message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, memberfound.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: "ERROR", message: "Invalid credentials" });
    }
    const token = generateToken(memberfound);
    return res.status(200).json({ status: "OK", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: "ERROR", message: "Server error" });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const memberfound = await Member.findOne({ email });
    if (!memberfound) {
      return res.status(404).json({ status: "ERROR", message: "No user found with that email" });
    }
    const newPassword = generatePassword();
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedData = { password: hashedNewPassword };
    await Member.findOneAndUpdate({ email }, updatedData);

    sendEmail(memberfound, newPassword);
    res.status(200).json({ status: "OK", message: "New password has been sent to email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ status: "ERROR", message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    const memberfound = await Member.findOne({ id });
    if (!memberfound) {
      return res.status(404).json({ status: "ERROR", message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, memberfound.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: "ERROR", message: "Incorrect old password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await Member.findOneAndUpdate({ id }, { password: hashedNewPassword });
    res.status(200).json({ status: "OK", message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ status: "ERROR", message: "Server error" });
  }
};
