// sw.js
self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    
    if (!event.data) return;
    
    const data = event.data.json();
    console.log('Push data:', data);
    
    const options = {
        body: data.data.body,
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: 'jacquard-manager',
        data: data.data,
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
        self.registration.showNotification(data.data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received', event);
    
    event.notification.close();
    
    if (event.action === 'view') {
        // Open the app when notification is clicked
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

self.addEventListener('notificationclose', function(event) {
    console.log('Notification closed', event);
});
