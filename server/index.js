const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const newReg = require("./model/newReg").newReg;
const { sendEmail } = require("./emails/regester");

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
    console.log(savedata);
    sendEmail(savedata).then(() => {
      console.log("Sent Email");
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log("Server Started Port 5000");
});
