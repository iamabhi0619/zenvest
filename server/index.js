const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const newReg = require("./model/newReg").newReg;
const { sendEmail } = require("./emails/regester.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("default"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://zenvestofficial:jeglHTfnySaq5LB7@zenvest-cluster0.vqxmhdq.mongodb.net/zenvest"
  );
  console.log("Database connected...!");
}

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/regester", async (req, res) => {
  try {
    const data = new newReg(req.body);
    const savedata = await data.save();
    console.log("New user added");
    sendEmail(savedata).then(() => {
      console.log("Sent Email");
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

app.get("/newreg", async (req, res) => {
  const id = +req.query.id;
  try {
    const data = await newReg.findOne({ id: id });

    if (data) {
      data.gender = `${data.gender.charAt(0).toUpperCase()}${data.gender.slice(
        1
      )}`;
      if (data.userimg == "") {
        const fullName = data.name;
        let firstName, lastName;
        if (fullName.includes(" ")) {
          const nameParts = fullName.split(" ");
          firstName = nameParts[0];
          lastName = nameParts.slice(1).join(" ");
        } else {
          firstName = fullName.slice(0, 1);
          lastName = fullName.slice(1);
        }

        data.userimg = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
      }
      res.json({ status: "Found", data: data });
    } else {
      res.json({ status: "NotFound", data: data });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "ServerNotFound", data: data });
  }
});

app.post("/updatei", async (req, res) => {
  const { id, remarks, status } = req.body;

  try {
    const updatedUser = await newReg.findOneAndUpdate(
      { id: id },
      { remarks: remarks, status: status },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ data: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Started Port", PORT);
});
