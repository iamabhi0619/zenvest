// index.js
const { sendNotification } = require('./notification');


async function main(cust) {
  const message = {
    notification: {
      title: cust.title,
      body: cust.body,
      image: '',
    },
    data: {
      customKey: 'customValue',
    },
  };

  await sendNotification(message);
}

main({
  title: "New user Registred..!!!",
  body: `Abhishek Kumar\nFemale`
}).catch(console.error);
