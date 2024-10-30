'use client';

import { initializeApp } from 'firebase/app';
import { createContext, useContext, useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { router } from '@inertiajs/react';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const FirebaseContext = createContext(firebaseApp);

export const FirebaseProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [auth, setAuth] = useState(null);

    const requestForToken = async () => {
        try {
            if (Notification.permission === 'granted') {
                const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY });
                setToken(token);
                sendTokenToServer(token);
            } else if (Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY });
                    setToken(token);
                    sendTokenToServer(token);
                } else {
                    console.log('Permission denied');
                }
            } else {
                console.log('Permission denied');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        requestForToken();
    }, [auth]);

    useEffect(() => {
        onMessage(messaging, (payload) => {
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: payload.notification.image,
            };
            self.registration.showNotification(notificationTitle, notificationOptions);
        });
    }, []);

    const sendTokenToServer = async (token) => {
        try {
            const response = await fetch('/fcm-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
        } catch (error) {
            console.error('Error sending token to server:', error);
        }
    };

    return (
        <FirebaseContext.Provider value={{ setAuth, token, requestForToken }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);