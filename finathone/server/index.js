const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const testController = require("./controller/tesing");
const paymentRoute = require("./routes/paymentRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
connectDB();

// API route to trigger the WhatsApp message using the controller
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/qr/:data", testController.QRCode);
app.use("/api/payment", paymentRoute);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
