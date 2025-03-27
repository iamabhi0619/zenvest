const venom = require("venom-bot");

let venomClient;

// Initialize Venom Bot
const initializeVenom = async () => {
    try {
        venomClient = await venom.create({
            session: "whatsapp-session", // Define session name
            headless: true, // Run in headless mode
            browserArgs: ["--no-sandbox", "--disable-setuid-sandbox", "--headless=new"], // Use new headless mode
            useChrome: true,
        });

        console.log("✅ Venom Bot is ready!");
    } catch (error) {
        console.error("❌ Venom Initialization Error:", error);
    }
};

// Function to send a text message
const sendWhatsAppMessage = async (number, message) => {
    if (!venomClient) throw new Error("Venom Bot is not initialized!");
    return await venomClient.sendText(`${number}@c.us`, message);
};

// Function to send an image
const sendWhatsAppImage = async (number, imageUrl, caption = "") => {
    if (!venomClient) throw new Error("Venom Bot is not initialized!");
    return await venomClient.sendImage(`${number}@c.us`, imageUrl, "image", caption);
};

module.exports = { initializeVenom, sendWhatsAppMessage, sendWhatsAppImage };
