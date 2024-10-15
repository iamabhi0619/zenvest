const collab = require("../model/collab.js");
const generateQRCode = require("../service/qrCode.js");
const email = require("../service/DsoMail.js");
exports.createOne = async (req, res) => {
  try {
    const data = new collab(req.body);
    const savedata = await data.save();
    console.log("New user added");
    const qrdata = await generateQRCode(savedata.id);
    email.sendEmail(savedata, qrdata);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
};
exports.updateOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await collab.findOne({ id: userId });
    if (!user) {
      res.status(401).send({ status: 3, message: "Not Registered..!!"});
    } else if (user.isChecked === true) {
      res.status(403).send({ status: 2, message: "Alrady Checked In", data: user  });
    } else {
      const updatedUser = await collab.findOneAndUpdate(
        { id: userId },
        { isChecked: true, DateOfEntry: new Date() },
        { new: false }
      );
      if (!updatedUser) {
        res.status(404).send({ status: 4, message: "Failed..!!" });
      } else {
        res.status(200).send({ status: 1, message: "Success", data: updatedUser });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to update user",
      error: error.message,
    });
    console.error(`Error updating user: ${error}`);
  }
};

exports.getall = async (req, res) => {
  try {
    const searchid = req.query.search || "";
    const users = await collab.find({
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