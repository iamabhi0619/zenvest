const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const { generateTicket } = require("./GenrateTicket");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});
client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});
client.on("qr", (qr) => {
  require("qrcode-terminal").generate(qr, { small: true });
});
client.initialize();
function formatPhoneNumber(phoneNumber) {
  let cleanNumber = phoneNumber.replace("+", "");

  if (cleanNumber.startsWith("91") && !cleanNumber.startsWith("9191")) {
    return "91" + cleanNumber;
  } else if (!cleanNumber.startsWith("91")) {
    return "91" + cleanNumber;
  }
  return cleanNumber;
}

const sendRegMessage = async (data) => {
  try {
    let { number } = data;
    number = formatPhoneNumber(number);
    const message = `*Hey ${data.name}*\nThanks for Registring in Finovation`;
    const image = await generateTicket(data);
    if (image) {
      const media = new MessageMedia("image/jpeg", image, "image.jpg");
      await client.sendMessage(`${number}@c.us`, message);
      await client.sendMessage(`${number}@c.us`, media);
    } else {
      await client.sendMessage(`${number}@c.us`, message);
    }
    console.log("Message sent sucessfull..!!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = { sendRegMessage };
