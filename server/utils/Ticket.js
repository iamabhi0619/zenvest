const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { QRCodeCanvas } = require("@loskir/styled-qr-code-node");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        // imageOptions: {
        //     image: logoPath,
        //     crossOrigin: "anonymous",
        //     margin: 5,
        //     size: 40,
        // },
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

        // Create an SVG overlay for the name
        const svgText = `
      <svg width="1080" height="1350">
        <style>
          text { font-family: Arial, sans-serif; max-width: 500px;  font-size: 80px; fill: #0f1c39; text-anchor: middle; dominant-baseline: middle; }
          .text-2 { font-family: Arial, sans-serif; max-width: 500px;  font-size: 30px; fill: #fff; text-anchor: middle; dominant-baseline: middle; }
        </style>
        <text x="353" y="1242">${name}</text>
        <text class="text-2" x="850" y="1242">@${regNumber}</text>
      </svg>`;

        const ticketPath = `ticket-${Date.now()}.png`;

        // Process the ticket image with Sharp
        await sharp(path.join(__dirname, "./ticketBase.png"))
            .composite([
                { input: qrBuffer, top: 678, left: 142 }, // QR Code at (160,450)
                { input: Buffer.from(svgText), top: 0, left: 0 }, // Name at (35,300)
            ])
            .toFile(ticketPath);

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
