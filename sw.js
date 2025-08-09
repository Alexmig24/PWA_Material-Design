self.addEventListener("install", (event) => {
    console.log("Alamcenando archivos en cache");
    const wu = new Promise ((resolve, reject) => {
        try {
            setTimeout(() => {
                const addFiles = "";
                console.log("Service Worker installed successfully");
                resolve();
            }, 1000);
            self.skipWaiting(); // Forzar la activación inmediata del SW
        } catch (error) {
            reject(error);
        }
    });
    event.waitUntil(wu);
});

self.addEventListener("activate", (event) => {
    // Elimina caches antiguas si es necesario
    console.log("Service Worker activating.");
    event.waitUntil(clients.claim()); // Asegura que el SW tome control de las páginas inmediatamente
});

self.addEventListener("fetch", (event) => {
    console.log("Cacheando claims");
    // event.respondWith(fetch(event.request));
    // console.log(fetch(event.request.url));
});

self.addEventListener("sync", (event) => {
    console.log("Syncing ... ESPE");
    console.log(event);
});

self.addEventListener("push", (event) => {
    console.log("Push notification recevid", event);
});