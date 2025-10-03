// sw.js - Service Worker for Background Notifications
self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    
    if (!event.data) return;
    
    try {
        const data = event.data.json();
        console.log('Push data:', data);
        
        const notificationData = data.data || {};
        const title = notificationData.title || 'Jacquard Manager';
        const body = notificationData.body || 'New update available';
        
        const options = {
            body: body,
            icon: './icon-192.png',
            badge: './icon-192.png',
            tag: 'jacquard-manager',
            data: notificationData,
            requireInteraction: true,
            actions: [
                {
                    action: 'view',
                    title: 'View Details'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    } catch (error) {
        console.error('Error processing push message:', error);
    }
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received', event);
    
    event.notification.close();
    
    if (event.action === 'view' || event.action === '') {
        // Open the app when notification is clicked
        event.waitUntil(
            clients.matchAll({type: 'window'}).then(function(clientList) {
                // Check if app is already open
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url === self.registration.scope && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If app is not open, open it
                if (clients.openWindow) {
                    return clients.openWindow('./');
                }
            })
        );
    }
});

self.addEventListener('notificationclose', function(event) {
    console.log('Notification closed', event);
});
