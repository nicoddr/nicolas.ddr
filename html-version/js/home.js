// js/home.js

function initHome() {
    const db = window.firebaseDB;
    const strip = document.getElementById('photo-strip');
    if (!db || !strip) return setTimeout(initHome, 50);

    const photosRef = window.firebaseRef(db, 'photos');

    window.firebaseOnValue(photosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const allPhotos = Object.values(data);

            strip.innerHTML = '';

            // We need enough items to fill the strip and loop seamlessly
            let items = [...allPhotos];
            while (items.length < 12 && items.length > 0) {
                items = [...items, ...allPhotos];
            }

            // Duplicate for infinite scroll effect
            const doubled = [...items, ...items];

            doubled.forEach(photo => {
                const item = document.createElement('div');
                item.className = 'strip-item';
                item.style.backgroundImage = `url(${photo.url})`;
                strip.appendChild(item);
            });
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
} else {
    initHome();
}
