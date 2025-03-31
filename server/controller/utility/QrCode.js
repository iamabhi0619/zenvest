const ApiError = require("../../utils/ApiError");
const { QRCodeCanvas } = require("@loskir/styled-qr-code-node");

// Function to generate a styled QR code dynamically
const generateStyledQR = async (options) => {
    const qrCode = new QRCodeCanvas(options);
    return await qrCode.toBuffer("image/png"); // Returns the QR code as a PNG buffer
};

// API to handle QR code generation requests
exports.generateStyledQR = async (req, res, next) => {
    try {
        const {
            data,
            width,
            height,
            margin,
            dotsColor,
            dotsType,
            backgroundColor,
            cornersSquareType,
            image,
            imageMargin,
            imageSize,
            hideBackgroundDots,
        } = req.query;

        // Validate input data
        if (!data) {
            throw new ApiError(400, "No data provided for QR code generation.");
        }

        // Configure QR code options with user-provided or default values
        const qrOptions = {
            width: parseInt(width) || 422,
            height: parseInt(height) || 422,
            margin: parseInt(margin) || 2,
            data: data,
            dotsOptions: {
                color: dotsColor || "#000",
                type: dotsType || "square",
            },
            backgroundOptions: {
                color: backgroundColor || "#fff",
                hideBackgroundDots: hideBackgroundDots === "true" || false,
            },
            cornersSquareOptions: {
                type: cornersSquareType || "square",
            },
        };

        // If an image is provided, include it in the QR code
        if (image) {
            qrOptions.imageOptions = {
                image,
                crossOrigin: "anonymous",
                margin: parseInt(imageMargin) || 5,
                size: parseInt(imageSize) || 40,
            };
        }

        // Generate QR code buffer
        const qrBuffer = await generateStyledQR(qrOptions);

        // Send the QR code as a PNG image
        res.setHeader("Content-Type", "image/png");
        res.send(qrBuffer);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
