const user = require("../model/user.js");
const email = require('../service/email.js');
const {sendNotification} = require("../service/Notification.js")

exports.getall = async (req, res) => {
  try {
    const searchid = req.query.search || "";
    const users = await user.find({
      $or: [
        { id: { $regex: searchid, $options: "i" } },
        { name: { $regex: searchid, $options: "i" } },
        { email: { $regex: searchid, $options: "i" } },
      ],
    }).sort({ _id: -1 });
    res.send({ status: "ok", data: users });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Failed to fetch users" });
    console.error(`Error fetching users: ${error}`);
  }
};

exports.createOne = async (req, res) => {
  try {
    const data = new user(req.body);
    const savedata = await data.save();
    console.log("New user added");
    email.sendEmail(savedata)
    sendNotification({title:"New Registration...!!",body:`${savedata.name}\n${savedata.gender}\n${savedata.interest} ${savedata.course} ${savedata.courseYear}`,image:"https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/new-registratrion.jpg?alt=media&token=8f6c9bf4-550e-42da-9850-dac3d8012c3e"})
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await user.findOneAndUpdate(
      { id: userId },
      updatedData,
      { new: false }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }
    res.send({ status: "ok", data: updatedUser });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to update user",
      error: error.message,
    });
    console.error(`Error updating user: ${error}`);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await user.findOneAndDelete({ id: userId });
    if (!deletedUser) {
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    }
    res.send({ status: "ok", message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to delete user",
      error: error.message,
    });
    console.error(`Error deleting user: ${error}`);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await user.findOne({ id: id });
    if (!userFound) {
      return res.status(404).json({ status: "error", message: "No such user" });
    }
    return res.status(200).json({ status: "ok", message: userFound });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "server error" });
  }
};