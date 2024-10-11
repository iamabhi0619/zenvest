const { QRCodeCanvas } = require("@loskir/styled-qr-code-node");
const path = require("path");

const generateQR = async (data) => {
  try {
    const logoPath = path.join(__dirname, "Logo.png");
    const qrCode = new QRCodeCanvas({
      width: 400,
      height: 400,
      margin: 10,
      data: JSON.stringify(data),
      dotsOptions: {
        color: "#0f1c39", // Set color for QR code dots
        type: "square", // Use square dots
      },
      backgroundOptions: {
        color: "#e9ebee", // Background color
      },
      cornersSquareOptions: {
        type: "square",
      },
      imageOptions: {
        image: logoPath, // Path to the logo image
        crossOrigin: "anonymous", // Enable cross-origin if needed
        margin: 5, // Margin for the logo
        size: 40, // Logo size (can adjust based on QR size)
      },
      backgroundOptions: {
        color: "#fff",
      },
    });

    const QrCode = await qrCode.toDataUrl();
    const QrImg = await qrCode.toBuffer();
    return { qrcode: QrCode, img: QrImg };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateQR };
