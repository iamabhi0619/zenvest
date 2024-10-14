const { generateQR } = require("../service/QrCode");
const { sendRegMessage } = require("../service/WhatsApp");
const crypto = require('crypto');
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: process.env.RAZER_ID,
  key_secret: process.env.RAZER_SECRET,
});

exports.test = async (req, res) => {
  const data = req.body;
  await sendRegMessage(data);
  res.send("message sent..!!");
};

exports.QRCode = async (req, res) => {
  try {
    const data = req.params.data; // Extract the `data` parameter from URL
    const qr = await generateQR(data); // Generate the QR code

    if (qr) {
      // Send the image response
      res.setHeader("Content-Type", "image/png");
      res.send(qr.img); // Send the PNG buffer image
    } else {
      res.status(404).send("QR Code not generated"); // Handle case where QR code generation fails
    }
  } catch (error) {
    console.error("Error in QRCode controller:", error);
    res.status(500).send("Internal Server Error"); // Send a 500 error if something goes wrong
  }
};
exports.payment = async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: `receipt_order_${Math.random()}`,
    payment_capture: 1,
    notes: {
      name: "Abhishek Kumar",
      RegNumber: "12303842",
    },
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json({ id: order.id, currency: order.currency, amount: order.amount });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Payment initiation failed" });
  }
};
exports.details = async (req, res) => {
  console.log("url hit");
  const secret = '123456789';  // Set this in Razorpay Dashboard
    // Validate the webhook signature sent by Razorpay
    const receivedSignature = req.headers['x-razorpay-signature'];
    const generatedSignature = crypto.createHmac('sha256', secret)
                                      .update(JSON.stringify(req.body))
                                      .digest('hex');

    if (receivedSignature === generatedSignature) {
        // Webhook is verified successfully
        const event = req.body.event;

        if (event === 'payment.captured') {
            const paymentData = req.body.payload.payment.entity;
            console.log('Payment successful:', paymentData);
            // Update your database, send a confirmation email, etc.
        } else if (event === 'payment.failed') {
            const paymentData = req.body.payload.payment.entity;
            console.log('Payment failed:', paymentData);
            // Handle payment failure logic here
        }

        res.status(200).json({ status: 'ok' });
    } else {
        // Webhook signature mismatch
        console.error('Invalid webhook signature');
        res.status(400).json({ status: 'invalid signature' });
    }
};
