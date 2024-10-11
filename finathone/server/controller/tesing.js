const { generateQR } = require("../service/QrCode");
const { sendRegMessage } = require("../service/WhatsApp");

exports.test = async (req, res) => {
    const data = req.body;
    await sendRegMessage(data);
    res.send("message sent..!!")
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
