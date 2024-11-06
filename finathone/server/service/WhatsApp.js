const axios = require('axios');
const { generateTicket } = require('./GenrateTicket');
const instanceId = process.env.WHATSAPP_INSTANCEID1;
const apiKey = process.env.WHATSAPP_APIKEY1;

function formatPhoneNumber(phoneNumber) {
  const cleanNumber = phoneNumber.replace(/\D/g, '').trim();
  const last10Digits = cleanNumber.slice(-10);
  if (last10Digits.length === 10) {
    return `+91${last10Digits}`;
  } else {
    throw new Error('Invalid phone number format');
  }
}

const sendRegMessage = async (data) => {
  try {
    let { number, name } = data;
    number = formatPhoneNumber(number);
    name = name.trim();
    const message = `*Hey ${name}*\nThank you for registering for FINATHON! We’re thrilled to have you onboard for this paper trading event, where you'll get hands-on with financial strategy in a risk-free environment. 💼📈\n📅 *Dates:* November 13 (9 AM - 4 PM) & November 14 (9 AM - 5 PM)\n📍 *Location:* Details will be shared soon via WhatsApp and email.\n🎟️ Your ticket is attached here. Be sure to have it ready on the event day for quick access!\nLooking forward to seeing you at FINATHON! Reach out if you have any questions.\n*Best,*\nTeam ZENVEST`;
    const image = await generateTicket(data);
    if (!image) {
      throw new Error('Failed to generate image');
    }
    const body = new URLSearchParams({
      token: apiKey,
      to: number,
      image: image.startsWith('data:image/') ? image.split(',')[1] : image,
      caption: message,
    });
    const response = await axios.post(
      `https://api.ultramsg.com/${instanceId}/messages/image`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if (response.data.sent === 'true') {
      console.log('Ticket sent successfully!');
    } else {
      console.error('Failed to send Ticket:', response.data);
    }
  } catch (error) {
    console.error('Error sending Ticket:', error);
  }
};

module.exports = { sendRegMessage };
