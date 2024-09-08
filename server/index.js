const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
// const userRouts = require("./routes/user");
const dotenv = require("dotenv");
// const collab = require("./routes/collab");
dotenv.config();

const memberRouts = require("./routes/member");


const app = express();
PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("default"));
app.use(express.static(path.join(__dirname, 'build')));

async function main() {
  await mongoose.connect(
    "mongodb+srv://zenvestofficial:jeglHTfnySaq5LB7@zenvest-cluster0.vqxmhdq.mongodb.net/zenvest"
  );
  console.log("Database connected...!");
}
main().catch((err) => {
  console.log(err);
});


app.use("/api/member", memberRouts.routes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(PORT, () => {
  console.log("Server started..!!");
});
