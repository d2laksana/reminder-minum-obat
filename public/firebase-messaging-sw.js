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
    apiKey: "AIzaSyDu9pj2lQQ1Xfy7jJniBXLAK4niueUlHyI",
    authDomain: "reminder-minum-obat-d1a97.firebaseapp.com",
    projectId: "reminder-minum-obat-d1a97",
    messagingSenderId: "445148842776",
    appId: "1:445148842776:web:6ecb339444e0b71617ec6d",
    measurementId: "G-PZBQEFPZZ1"
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