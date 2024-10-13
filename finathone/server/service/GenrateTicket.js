const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { generateQR } = require("./QrCode");
const fontPath = path.join(__dirname, 'Advertising Script Bold Trial.ttf');
registerFont(fontPath, { family: 'CustomFont' });
const generateTicket = async (data) => {
  const { name } = data;
  try {
    // Generate QR code data URL
    let qrCodeDataUrl = await generateQR(data);
    qrCodeDataUrl = qrCodeDataUrl.qrcode;
    const baseImage = await loadImage(path.join(__dirname, "./ticketBase.png"));
    // Create a canvas of the same size as the base image
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");
    // Draw the base image on the canvas
    ctx.drawImage(baseImage, 0, 0);
    // Load the QR code image
    const qrImage = await loadImage(qrCodeDataUrl);
    const qrX = 160;
    const qrY = 440;
    const qrSize = 400;
    // Draw the QR code on the canvas
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
    // Set custom font and color for the name
    ctx.font = "61px 'CustomFont'";
    ctx.fillStyle = "#0f1c39"; // Set text color (green in this case)
    ctx.textAlign = "center";
    ctx.fillText(name, baseImage.width / 2, 368);
    const base64Image = canvas.toDataURL("image/png");
    // Remove the prefix from base64 string
    const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
    // Return the base64 image
    return base64Data;
  } catch (error) {
    console.error("Error generating dynamic image:", error);
    throw new Error("Failed to generate dynamic image");
  }
};

module.exports = { generateTicket };
