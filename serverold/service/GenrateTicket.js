const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { generateQR } = require("./QrCode");

const fontPath = path.join(__dirname, 'Advertising Script Bold Trial.ttf');
registerFont(fontPath, { family: 'CustomFont' });

const generateTicket = async (data) => {
  let { name } = data;

  // Check if the name is too long, and if so, use only the first word to prevent overflow
  if (name.length > 15) {
    name = name.split(" ")[0]; // Take the first word only if name is too long
  }

  try {
    // Generate QR code data URL
    let qrCodeDataUrl = await generateQR(data);
    qrCodeDataUrl = qrCodeDataUrl.qrcode;

    // Load the base image
    const baseImage = await loadImage(path.join(__dirname, "./ticketBase.png"));

    // Create a canvas with the base image size
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");

    // Draw the base image onto the canvas
    ctx.drawImage(baseImage, 0, 0);

    // Load the QR code image
    const qrImage = await loadImage(qrCodeDataUrl);

    // Position and size for the QR code on the ticket
    const qrX = 160;
    const qrY = 440;
    const qrSize = 400;

    // Draw the QR code on the canvas
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // Set custom font and color for the name
    ctx.font = "61px 'CustomFont'";
    ctx.fillStyle = "#0f1c39"; // Set text color
    ctx.textAlign = "center";

    // Draw the name on the canvas, centered
    ctx.fillText(name, baseImage.width / 2, 368);

    // Convert canvas to a base64 image and remove prefix
    const base64Image = canvas.toDataURL("image/png");
    const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");

    return base64Data;
  } catch (error) {
    console.error("Error generating dynamic image:", error);
    throw new Error("Failed to generate dynamic image");
  }
};

module.exports = { generateTicket };
