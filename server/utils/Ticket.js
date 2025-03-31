const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
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

        // Load ticket base image
        const ticketImage = await Jimp.read(path.join(__dirname, "./ticketBase.png"));
        const qrImage = await Jimp.read(qrBuffer);

        // Resize and overlay QR Code
        qrImage.resize(422, 422);
        ticketImage.composite(qrImage, 142, 678);

        // Load font for text rendering
        const fontLarge = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

        // Add name and registration number
        ticketImage.print(fontLarge, 220, 1200, { text: name, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER });
        ticketImage.print(fontSmall, 820, 1242, { text: `@${regNumber}`, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER });

        // Save the modified image
        const ticketPath = `ticket-${Date.now()}.png`;
        await ticketImage.writeAsync(ticketPath);

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