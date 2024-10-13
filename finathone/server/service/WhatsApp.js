const axios = require('axios');
const { generateTicket } = require('./GenrateTicket');

const instanceId = 'instance97057';
const apiKey = 'rjzmwtztf205mtw2';
function formatPhoneNumber(phoneNumber) {
  let cleanNumber = phoneNumber.replace(/\D/g, '');
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    return `+${cleanNumber}`;
  } else if (cleanNumber.length === 10) {
    return `+91${cleanNumber}`;
  } else {
    throw new Error('Invalid phone number format');
  }
}
const sendRegMessage = async (data) => {
  try {
    let { number } = data;
    number = formatPhoneNumber(number);
    const message = `*Hey ${data.name}*\nThanks for Registering in Finovation`;
    const image = await generateTicket(data);
    if (!image) {
      throw new Error('Failed to generate image');
    }
    const body = {
      token: apiKey,
      to: `+${number}`,
      image: image.startsWith('data:image/') ? image.split(',')[1] : image,
      caption: message,
    };
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