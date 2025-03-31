const { default: axios } = require("axios");
const talert = require("./telegram");

const WAHA_URL = process.env.WAHA_URL; // Example: "https://your-waha-instance.onrender.com"

/**
 * Converts phone number to WhatsApp's required format (E.164)
 * @param {string} phone - The phone number
 * @returns {string} Formatted WhatsApp ID
 */
const formatPhoneNumber = (phone) => {
    let formatted = phone.replace(/\D/g, ""); // Remove non-numeric characters

    // If number doesn't start with country code, assume it's Indian (+91)
    if (!formatted.startsWith("91") && formatted.length === 10) {
        formatted = `91${formatted}`;
    }

    return `${formatted}@c.us`; // WhatsApp chat ID format
};

/**
 * Sends a text message via WAHA API
 * @param {string} phone - Recipient phone number (any format)
 * @param {string} message - Message text
 */
const sendTextMessage = async (phone, message) => {
    const formattedPhone = formatPhoneNumber(phone);

    try {
        const response = await axios.post(`${WAHA_URL}/sendText`, {
            session: "default",
            chatId: formattedPhone,
            body: message,
        });

        console.log("Text Message Sent:");
        return response.data;
    } catch (error) {
        talert.low("Error sending message in whtsapp");
        console.error("Error sending text message:", error.message);
    }
};

// Export functions
module.exports = {
    sendTextMessage
};
