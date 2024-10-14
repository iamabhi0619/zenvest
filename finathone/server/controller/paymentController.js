const crypto = require("crypto");
const Razorpay = require("razorpay");
const { sendRegMessage } = require("../service/WhatsApp");
const razorpay = new Razorpay({
  key_id: process.env.RAZER_ID,
  key_secret: process.env.RAZER_SECRET,
});

exports.createOrder = async (req, res) => {
  const data = req.body;
  const options = {
    amount: 99 * 100,
    currency: "INR",
    receipt: `receipt_order_${Math.random()}`,
    payment_capture: 1,
    notes: data,
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json({ id: order.id, currency: order.currency, amount: order.amount });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Payment initiation failed" });
  }
};
exports.verification = async (req, res) => {
  const secret = process.env.RAZER_WSECRET;
  const receivedSignature = req.headers["x-razorpay-signature"];
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (receivedSignature === generatedSignature) {
    const event = req.body.event;
    if (event === "payment.captured") {
      const paymentData = req.body.payload.payment.entity;
      await sendRegMessage(paymentData.notes);
      console.log("Payment sucess message sent " + paymentData.notes.name);
      // Update your database, send a confirmation email, etc.
    } else if (event === "payment.failed") {
      const paymentData = req.body.payload.payment.entity;
      console.log("Payment failed:", paymentData);
      // Handle payment failure logic here
    }
    res.status(200).json({ status: "ok" });
  } else {
    console.error("Invalid webhook signature");
    res.status(400).json({ status: "invalid signature" });
  }
};
