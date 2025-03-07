const crypto = require("crypto");
const Razorpay = require("razorpay");
const { sendRegMessage } = require("../service/WhatsApp");
const razorpay = new Razorpay({
  key_id: process.env.RAZER_ID,
  key_secret: process.env.RAZER_SECRET,
});
const { Finathone } = require('../model/finathoneUser');
const { sendEmail } = require("../service/SendEmail");
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
  let responseSent = false;
  try {
    const event = req.body.event;
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZER_WSECRET;
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");
    // if (expectedSignature !== razorpaySignature) {
    //   console.log("Invalid signature:", { expectedSignature, razorpaySignature });
    //   res.status(400).json({ status: "error", message: "Invalid signature" });
    //   responseSent = true;
    //   return;
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
      const existingUser = await Finathone.findOne({ "payment.paymentId": paymentData.id });
      if (existingUser) {
        console.log("Duplicate webhook event received for paymentId:", paymentData.id);
        res.status(200).json({ status: "ok" });
        responseSent = true;
        return;
      }
      const userData = paymentData.notes;
      await Finathone.findOneAndUpdate(
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
      await sendEmail(userData);
      await sendRegMessage(userData);
      console.log("Payment success message sent to", userData.name);
      res.status(200).json({ status: "ok" });
      responseSent = true;
    } else if (event === "payment.failed") {
      const paymentData = req.body.payload.payment.entity;
      console.log("Payment failed:", paymentData);
      res.status(200).json({ status: "ok" });
      responseSent = true;
    }
  } catch (error) {
    console.error("Webhook verification failed:", error);
    if (!responseSent) {
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  } finally {
    if (!responseSent) {
      res.status(200).json({ status: "ok" });
      console.log("Final response sent to ensure no retries.");
    }
  }
};
