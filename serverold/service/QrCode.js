const { QRCodeCanvas } = require("@loskir/styled-qr-code-node");
const path = require("path");

const generateQR = async (data) => {
  try {
    delete data.dp; // Remove dp key

    const logoPath = path.join(__dirname, "Logo.png");
    const qrCode = new QRCodeCanvas({
      width: 400,
      height: 400,
      margin: 10,
      data: JSON.stringify(data),
      dotsOptions: {
        color: "#0f1c39",
        type: "square",
      },
      backgroundOptions: {
        color: "#fff",
      },
      cornersSquareOptions: {
        type: "square",
      },
      imageOptions: {
        image: logoPath,
        crossOrigin: "anonymous",
        margin: 5,
        size: 40,
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
