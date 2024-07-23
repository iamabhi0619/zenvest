
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

main().catch(console.error);