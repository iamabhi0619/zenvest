const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const userRouts = require("./routes/user");
// const collab = require("./routes/collab");
const memberRouts = require("./routes/member");
const finathoneRouts = require("./routes/finathone");
const { sendEmailContect } = require("./service/SendEmail");

const app = express();
dotenv.config();
PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("default"));
app.use(express.static(path.join(__dirname, "build")));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Database connected!");
}
main().catch((err) => {
  console.log(err);
});

app.use("/api/user", userRouts.routes);
app.use("/api/member", memberRouts.routes);
app.use("/api/finathone", finathoneRouts.routes);

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  await sendEmailContect(req.body);
  res.status(200).json({ success: true, message: "Form submitted successfully" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


const currentDate = new Date();
console.log(currentDate.toLocaleString());


app.listen(PORT, () => {
  console.log("Server started..!!");
});
