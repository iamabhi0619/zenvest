const crypto = require("crypto");
const { Workshop } = require("../model/tradeARithm");
const alertTelegram = require("../utils/telegram");

const verifyWebhookSignature = (req) => {
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");
    return razorpaySignature === expectedSignature;
};

const updateUserPaymentStatus = async (orderId, paymentId, status) => {
    try {
        const user = await Workshop.findOne({ "payment.orderId": orderId });
        if (!user) {
            alertTelegram("high", `User not found for the given order ID: ${orderId}`);
            return null;
        }
        user.payment.status = status;
        user.payment.paymentId = paymentId;
        await user.save();
        return user;
    } catch (error) {
        console.error("Database error while updating payment status:", error);
        return null;
    }
};

const handlePaymentCaptured = async (payload) => {
    const paymentId = payload.payment.entity.id;
    const orderId = payload.payment.entity.order_id;
    const user = await updateUserPaymentStatus(orderId, paymentId, "Completed");
    if (user) {
        const totalCompletedPayments = await Workshop.countDocuments({ "payment.status": "Completed" });
        alertTelegram("high", `Payment success and user updated successfully.\nTotal Completed Payments: ${totalCompletedPayments}`);
    }
};

const handlePaymentFailed = async (payload) => {
    const paymentId = payload.payment.entity.id;
    const orderId = payload.payment.entity.order_id;
    const user = await updateUserPaymentStatus(orderId, paymentId, "Failed");
    if (user) {
        alertTelegram("high", "Payment failed and user updated successfully.");
        alertTelegram("low", `Payment failed for user. Contact details:\nName: ${user.name}\nEmail: ${user.email}\nNumber: ${user.number}\nReg Number: ${user.regNumber}\nGender: ${user.gender}`);
    }
};

exports.paymentWebhook = async (req, res) => {
    try {
        if (!verifyWebhookSignature(req)) {
            return res.status(400).json({ success: false, message: "Invalid webhook signature." });
        }
        const { event, payload } = req.body;
        switch (event) {
            case "payment.captured":
                await handlePaymentCaptured(payload);
                break;
            case "payment.failed":
                await handlePaymentFailed(payload);
                break;
            default:
                console.log("Unhandled event type:", event);
        }
        res.status(200).json({ success: true, message: "Webhook processed successfully." });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ success: false, message: "Internal server error while processing webhook." });
    }
};
