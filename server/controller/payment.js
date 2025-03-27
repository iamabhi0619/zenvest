const crypto = require("crypto");
const { Workshop } = require("../model/tradeARithm");
const alertTelegram = require("../utils/telegram");

exports.paymentWebhook = async (req, res, next) => {
    try {
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
                alertTelegram("high", `Payment success and user updated successfully.\nTotal:- ${Workshop.countDocuments}`);
            } catch (error) {
                console.error("Database error while updating payment status:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to update payment status. Please try again later.",
                });
            }
            console.log("Payment captured and user updated successfully.");
        } else if (event == "payment.failed") {
            const paymentId = payload.payment.entity.id;
            const orderId = payload.payment.entity.order_id;
            // Find the user by orderId
            const user = await Workshop.findOne({ "payment.orderId": orderId });
            if (!user) {
                alertTelegram("high", `User not found for the given order ID: ${orderId}`)
                return res.status(404).json({
                    success: false,
                    message: "User not found for the given order ID.",
                });
            }
            // Update payment status
            user.payment.status = "Failed";
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
            alertTelegram("high", "Payment failed and user updated successfully.");
            alertTelegram("low", `Payment failed for user Please try contact him:\nName:- ${user.name}\nEmail:- ${user.email}\nNumber:- ${user.number}\nReg number:- ${user.regNumber}\n${user.gender}`);
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
