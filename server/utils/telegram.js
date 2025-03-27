const TelegramBot = require("node-telegram-bot-api");

// Replace with your bot token
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// User categories
const users = {
    high: [5671345486],
    mid: [5671345486, 1085980769, 1848259885],
    low: [5671345486, 1085980769, 1848259885],
};

// Function to send message or image with caption
const alertTelegram = (category, message, imageUrl = null) => {
    if (!users[category]) {
        console.error(`❌ Category "${category}" not found!`);
        return;
    }

    users[category].forEach((userId) => {
        if (imageUrl) {
            bot.sendPhoto(userId, imageUrl, { caption: message })
                .then(() => console.log(`📸 Image sent to ${userId} (${category})`))
                .catch((err) => console.error(`❌ Error sending image to ${userId}:`, err));
        } else {
            bot.sendMessage(userId, message)
                .then(() => console.log(`✅ Message sent to ${userId} (${category})`))
                .catch((err) => console.error(`❌ Error sending message to ${userId}:`, err));
        }
    });
};

// Export function for use in other files
module.exports = alertTelegram;
