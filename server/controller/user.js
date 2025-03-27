const Razorpay = require("razorpay");
const { Workshop } = require("../model/tradeARithm");
const ApiError = require("../utils/ApiError");

const razorpay = new Razorpay({
    key_id: process.env.RAZER_ID,
    key_secret: process.env.RAZER_SECRET,
});


const requiredFields = {
    name: "Full Name",
    email: "Email Address",
    gender: "Gender",
    number: "Phone Number",
    regNumber: "Registration Number",
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, gender, number, regNumber, courses, year } = req.body;

        const missingFields = Object.keys(requiredFields).filter(key => !req.body[key]);

        if (missingFields.length > 0) {
            return next(new ApiError(
                400,
                `Missing required fields: ${missingFields.map(field => requiredFields[field]).join(", ")}`,
                "validation",
                `Please provide ${missingFields.map(field => requiredFields[field]).join(", ")} to proceed.`
            ));
        }

        // Validate phone number format (assuming a simple 10-digit validation)
        if (!/^\d{10}$/.test(number)) {
            throw new ApiError(400, "Invalid phone number format.", "validation", "invalid phone number");
        }
        // Create Razorpay order
        const options = {
            amount: 1 * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
            payment_capture: 1,
        };
        let order;
        try {
            order = await razorpay.orders.create(options);
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            throw new ApiError(500, "Failed to create payment order. Please try again later.", "payment", "razorpay error");
        }
        // Save user registration details
        const newUser = new Workshop({
            name,
            email,
            gender,
            number,
            regNumber,
            courses,
            year,
            payment: {
                orderId: order.id,
                amount: options.amount,
                status: "Pending",
            },
        });
        try {
            await newUser.save();
        } catch (error) {
            console.error("Database error while saving user:", error);
            throw new ApiError(500, "Failed to register user. Please try again later.", "database", "database error");
        }
        res.status(201).json({
            success: true,
            message: "Registration successful. Complete payment to confirm registration.",
            user: newUser,
        });

    } catch (error) {
        next(error);
    }
};

exports.verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        // Validate required fields
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return next(new ApiError(400, "Missing required payment fields.", "validation", "missing payment fields"));
        }
        // Verify the payment signature
        const crypto = require("crypto");
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZER_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return next(new ApiError(400, "Invalid payment signature.", "payment", "signature mismatch"));
        }
        // Find the user by orderId
        const user = await Workshop.findOne({ "payment.orderId": razorpay_order_id });
        if (!user) {
            return next(new ApiError(404, "User not found for the given order ID.", "database", "user not found"));
        }
        // Update payment status
        user.payment.status = "Completed";
        user.payment.paymentId = razorpay_payment_id;
        try {
            await user.save();
        } catch (error) {
            console.error("Database error while updating payment status:", error);
            throw new ApiError(500, "Failed to update payment status. Please try again later.", "database", "database error");
        }
        res.status(200).json({
            success: true,
            message: "Payment verified successfully.",
            user,
        });
    } catch (error) {
        next(error);
    }
};

exports.paymentWebhook = async (req, res, next) => {
    try {
        const crypto = require("crypto");
        // Razorpay sends the signature in the headers
        const razorpaySignature = req.headers["x-razorpay-signature"];
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        // Verify the webhook signature
        const body = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(body)
            .digest("hex");

        if (razorpaySignature !== expectedSignature) {
            return res.status(400).json({
                success: false,
                message: "Invalid webhook signature.",
            });
        }
        // Handle the event
        const event = req.body.event;
        const payload = req.body.payload;
        if (event === "payment.captured") {
            const paymentId = payload.payment.entity.id;
            const orderId = payload.payment.entity.order_id;

            // Find the user by orderId
            const user = await Workshop.findOne({ "payment.orderId": orderId });
            if (!user) {
                console.error("User not found for the given order ID:", orderId);
                return res.status(404).json({
                    success: false,
                    message: "User not found for the given order ID.",
                });
            }
            // Update payment status
            user.payment.status = "Completed";
            user.payment.paymentId = paymentId;
            try {
                await user.save();
            } catch (error) {
                console.error("Database error while updating payment status:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to update payment status. Please try again later.",
                });
            }
            console.log("Payment captured and user updated successfully.");
        }
        res.status(200).json({
            success: true,
            message: "Webhook processed successfully.",
        });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while processing webhook.",
        });
    }
};
