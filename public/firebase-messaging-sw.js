// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

const firebaseConfig = {
    apiKey: "AIzaSyB5LfkRboS8vWZShOTxvZ4leYAYRkTfRsU",
    authDomain: "mobile-jkn-a8de2.firebaseapp.com",
    projectId: "mobile-jkn-a8de2",
    storageBucket: "mobile-jkn-a8de2.firebasestorage.app",
    messagingSenderId: "243054835921",
    appId: "1:243054835921:web:6dcf9886e0f2a084e26df0",
    measurementId: "G-QN29CZJ42H"
};

firebase.initializeApp(firebaseConfig || defaultConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.image,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });