const axios = require("axios");
const instanceId = process.env.WHATSAPP_INSTANCEID1
const apiKey = process.env.WHATSAPP_APIKEY1;
function formatPhoneNumber(phoneNumber) {
  let cleanNumber = phoneNumber.replace(/\D/g, "");
  if (cleanNumber.startsWith("91") && cleanNumber.length === 12) {
    return `+${cleanNumber}`;
  } else if (cleanNumber.length === 10) {
    return `+91${cleanNumber}`;
  } else {
    throw new Error("Invalid phone number format");
  }
}

const sendRegMessage = async (data) => {
  try {
    let { number } = data;
    number = number.toString();
    number = formatPhoneNumber(number);
    const message = `Dear ${data.name},\n\nThank you for registering as a member of Zenvest LPU!\n\nWe are delighted to welcome you to our vibrant community dedicated to technology, finance, entrepreneurship, and building a secure future. Your enthusiasm and support are valuable to us, and we look forward to seeing the positive impact you will bring.\n\nAs part of our onboarding process, we will be scheduling an interview with you shortly. Further details will be shared soon, so please stay tuned!\n\nIn the meantime, feel free to connect with us on our social media platforms to stay updated and engage with our community:\nInstagram: https://www.instagram.com/zenvest_lpu?igsh=NjlpZzB5eG1mOTdy\nLinkedIn: https://www.linkedin.com/company/zenvest-lpu/\nThank you once again for your active participation. We are excited to grow and achieve great things together!\n\nBest regards,\nZenvest'LPU`;
    const body = {
      token: apiKey,
      to: `${number}`,
      body: message,
    };

    const response = await axios.post(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data.sent === "true") {
      console.log("Message sent successfully!");
    } else {
      console.error("Failed to send message:", response.data);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = { sendRegMessage };
