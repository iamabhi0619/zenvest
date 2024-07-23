// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDCe7Zo1_BeZniNuwgdq0OYUMZfUIFe0fQ",
  authDomain: "zenvest-8f417.firebaseapp.com",
  projectId: "zenvest-8f417",
  storageBucket: "zenvest-8f417.appspot.com",
  messagingSenderId: "525863628284",
  appId: "1:525863628284:web:ebf19d1cd22c3baf659679",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image, // Use 'payload.notification.icon' if 'icon' property is set instead of 'image'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
