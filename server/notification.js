
const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');

const serviceAccountKeyFile = path.join(__dirname, 'serviceAccountKey.json');

const projectId = 'zenvest-8f417';

const fcmUrl = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

const userTokens = [
  'cnx3XmDNRuXzopKM_usrBX:APA91bFm8sQZdpxu4o6wL2TgLsO9T8-NvVEtkfRZU2JA8Mx6_lwNPYrBW8bVaBDOT6XlUb2g5XJLVwYRHinq-0fwtCvNmfl1-7olCrAMlZGHzdL8WcCd93-PpSFuPB2QzRah7WGq0qCl',
  'cnx3XmDNRuXzopKM_usrBX:APA91bFm8sQZdpxu4o6wL2TgLsO9T8-NvVEtkfRZU2JA8Mx6_lwNPYrBW8bVaBDOT6XlUb2g5XJLVwYRHinq-0fwtCvNmfl1-7olCrAMlZGHzdL8WcCd93-PpSFuPB2QzRah7WGq0qCl',
];

async function getAccessToken() {
  try {
    const auth = new GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const accessTokenResponse = await client.getAccessToken();
    return accessTokenResponse.token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function sendNotification(message) {
  try {
    const accessToken = await getAccessToken();

    for (const token of userTokens) {
      const notificationMessage = {
        ...message,
        token: token, // Set the token for each message
      };

      const response = await axios.post(fcmUrl, { message: notificationMessage }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log(`Notification sent successfully to ${token}:`, response.data);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error sending notification:', error.response.data);
    } else {
      console.error('Error sending notification:', error.message);
    }
  }
}

module.exports = {
  sendNotification,
};
