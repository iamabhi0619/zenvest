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
    const message = `*Hey ${data.name}*\nThank you for registering as a member of Zenvest LPU!\nWe are thrilled to have you, our vibrant community dedicated to technology, finance, entrepreneurship, and building a secure future.
We are excited to inform you that we will soon be scheduling an interview as part of our onboarding process. We will provide all the details shortly.\nThank you for your support and active participation.`;
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
