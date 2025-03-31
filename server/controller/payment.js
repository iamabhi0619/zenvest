const crypto = require("crypto");
const { Workshop } = require("../model/tradeARithm");
const talert = require("../utils/telegram");
const { generateTicket } = require("../utils/Ticket");
const { sendEmailWithAttachment } = require("../utils/emailService");

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
            talert.high(`User not found for the given order ID: ${orderId}`);
            return null;
        }
        user.payment.status = status;
        user.payment.paymentId = paymentId;
        await user.save();
        return user;
    } catch (error) {
        talert.high("Database error while updating payment status." + error);
        return null;
    }
};

const handlePaymentCaptured = async (payload) => {
    try {
        const paymentId = payload.payment.entity.id;
        const orderId = payload.payment.entity.order_id;
        const user = await updateUserPaymentStatus(orderId, paymentId, "Completed");

        if (!user) return;

        const totalCompletedPayments = await Workshop.countDocuments({ "payment.status": "Completed" });

        try {
            const ticketUrl = await generateTicket(user);
            await sendEmailWithAttachment(user.email, user.name, user.regNumber, ticketUrl);
            await talert.mid(user.email, user.name, user.regNumber, ticketUrl);
        } catch (error) {
            talert.high(`Error sending email or generating ticket: ${error.message}`);
        }

        talert.mid(`Payment success and user updated.\nTotal Completed Payments: ${totalCompletedPayments}`);
    } catch (error) {
        talert.high(`Error handling payment capture: ${error.message}`);
    }
};


const handlePaymentFailed = async (payload) => {
    const paymentId = payload.payment.entity.id;
    const orderId = payload.payment.entity.order_id;
    const user = await updateUserPaymentStatus(orderId, paymentId, "Failed");
    if (user) {
        talert.high("Payment failed and user updated successfully.");
        talert.low(`Payment failed for user. Contact details:\nName: ${user.name}\nEmail: ${user.email}\nNumber: ${user.number}\nReg Number: ${user.regNumber}\nGender: ${user.gender}`)
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
        talert.high("Error processing webhook: " + error);
        res.status(500).json({ success: false, message: "Internal server error while processing webhook." });
    }
};
