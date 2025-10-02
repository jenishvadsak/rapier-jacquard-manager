// sw.js - Place this in your root directory
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDHBa63-zdatu-5xvHA7tdJMeBx9wFb9fw",
  authDomain: "rapier-manager.firebaseapp.com",
  projectId: "rapier-manager",
  storageBucket: "rapier-manager.firebasestorage.app",
  messagingSenderId: "161632944775",
  appId: "1:161632944775:web:be4a6493d8614938ceae22"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new update',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'rapier-notification',
    renotify: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
