const { generateQR } = require("../service/QrCode");
const { sendRegMessage } = require("../service/WhatsApp");

exports.test = async (req, res) => {
  const data = req.body;
  await sendRegMessage(data);
  res.send("message sent..!!");
};
exports.QRCode = async (req, res) => {
  try {
    const data = req.params.data; // Extract the `data` parameter from URL
    const qr = await generateQR(data); // Generate the QR code

    if (qr) {
      // Send the image response
      res.setHeader("Content-Type", "image/png");
      res.send(qr.img); // Send the PNG buffer image
    } else {
      res.status(404).send("QR Code not generated"); // Handle case where QR code generation fails
    }
  } catch (error) {
    console.error("Error in QRCode controller:", error);
    res.status(500).send("Internal Server Error"); // Send a 500 error if something goes wrong
  }
};

exports.details = async (req, res) => {
  console.log("url hit");
  const secret = "123456789";
  const receivedSignature = req.headers["x-razorpay-signature"];
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (receivedSignature === generatedSignature) {
    const event = req.body.event;
    if (event === "payment.captured") {
      const paymentData = req.body.payload.payment.entity;
      console.log("Payment successful:", paymentData);
      // Update your database, send a confirmation email, etc.
    } else if (event === "payment.failed") {
      const paymentData = req.body.payload.payment.entity;
      console.log("Payment failed:", paymentData);
      // Handle payment failure logic here
    }

    res.status(200).json({ status: "ok" });
  } else {
    console.error("Invalid webhook signature");
    res.status(400).json({ status: "invalid signature" });
  }
};
