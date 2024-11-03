const crypto = require("crypto");
const Razorpay = require("razorpay");
const { sendRegMessage } = require("../service/WhatsApp");
const razorpay = new Razorpay({
  key_id: process.env.RAZER_ID,
  key_secret: process.env.RAZER_SECRET,
});

const User = require("../model/user");

exports.createOrder = async (req, res) => {
  const data = req.body;
  const options = {
    amount: 1 * 100,
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
  try {
    const event = req.body.event;
    const razorpaySignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZER_WSECRET;
    // Verify the signature
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');
    // if (expectedSignature !== razorpaySignature) {
    //   console.log("Invalid signature" + expectedSignature + razorpaySignature);
    //   return res.status(400).json({ status: "error", message: "Invalid signature" });
    // }
    if (event === "payment.captured") {
      const paymentData = req.body.payload.payment.entity;
      const paymentDetails = {
        orderId: paymentData.order_id,
        paymentId: paymentData.id,
        signature: paymentData.signature,
        status: paymentData.status,
        amount: paymentData.amount / 100,
      };
      const userData = paymentData.notes;
      await sendRegMessage(userData);
      await User.findOneAndUpdate(
        { regNumber: userData.regNumber },
        {
          name: userData.name,
          email: userData.email,
          gender: userData.gender,
          number: userData.number,
          dp: userData.dp,
          payment: paymentDetails,
          attendance: [],
        },
        { new: true, upsert: true }
      );
      console.log("Payment success message sent " + userData.name);
      // Additional logic (e.g., send confirmation email)
    } else if (event === "payment.failed") {
      const paymentData = req.body.payload.payment.entity;
      console.log("Payment failed:", paymentData);
    }
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
