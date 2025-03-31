const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");
const { QRCodeCanvas } = require("@loskir/styled-qr-code-node");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register a font
// registerFont(path.join(__dirname, "./Arial.ttf"), { family: "Arial" });

// Generate a styled QR Code as a buffer
const generateStyledQR = async (data) => {
    const qrCode = new QRCodeCanvas({
        width: 422,
        height: 422,
        margin: 0,
        data: JSON.stringify(data),
        dotsOptions: {
            color: "#fff",
            type: "square",
        },
        backgroundOptions: {
            color: "#000",
        },
        cornersSquareOptions: {
            type: "square",
        },
    });
    return await qrCode.toBuffer();
};

// Generate Ticket with Name & QR Code
const generateTicket = async (data) => {
    let { name, regNumber } = data;

    // Limit name length to prevent overflow
    if (name.length > 15) {
        name = name.split(" ")[0];
    }

    try {
        // Generate Styled QR code
        const qrBuffer = await generateStyledQR({
            name: name,
            regNumber: regNumber,
        });

        // Load base ticket image
        const baseImage = await loadImage(path.join(__dirname, "./ticketBase.png"));
        const qrImage = await loadImage(qrBuffer);

        // Create Canvas
        const canvas = createCanvas(baseImage.width, baseImage.height);
        const ctx = canvas.getContext("2d");

        // Draw base image
        ctx.drawImage(baseImage, 0, 0);

        // Draw QR Code
        ctx.drawImage(qrImage, 142, 678, 422, 422);

        // Set text styles
        ctx.font = "80px Arial";
        ctx.fillStyle = "#0f1c39";
        ctx.textAlign = "center";
        ctx.fillText(name, 353, 1242);

        ctx.font = "30px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText(`@${regNumber}`, 850, 1242);

        // Save the modified image
        const ticketPath = `ticket-${Date.now()}.png`;
        fs.writeFileSync(ticketPath, canvas.toBuffer("image/png"));

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(ticketPath, {
            folder: "tickets",
        });

        // Delete local file after upload
        fs.unlinkSync(ticketPath);
        return uploadResponse.secure_url; // Return Cloudinary URL

    } catch (error) {
        console.error("Error generating ticket:", error);
        throw new Error("Failed to generate ticket");
    }
};

module.exports = { generateTicket };