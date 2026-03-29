// js/home.js

function initHome() {
    const db = window.firebaseDB;
    const scroller1 = document.getElementById('scroller-1');
    const scroller2 = document.getElementById('scroller-2');
    if (!db || !scroller1 || !scroller2) return setTimeout(initHome, 50);

    const photosRef = window.firebaseRef(db, 'photos');

    window.firebaseOnValue(photosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const allPhotos = Object.values(data);

            // Clear current items
            scroller1.innerHTML = '';
            scroller2.innerHTML = '';

            // If we have photos, split them in half for the two scrollers
            const half = Math.ceil(allPhotos.length / 2);
            const r1Photos = allPhotos.slice(0, half);
            const r2Photos = allPhotos.slice(half);

            // Add photos. If very few, duplicate to make the scroller effect look good
            const fillScroller = (container, photosList) => {
                let itemsToAdd = [...photosList];
                // Duplicate if we have less than 5 to make the track long enough to scroll infinite
                while (itemsToAdd.length < 5 && itemsToAdd.length > 0) {
                    itemsToAdd = [...itemsToAdd, ...photosList];
                }

                itemsToAdd.forEach(photo => {
                    const item = document.createElement('div');
                    item.className = 'scroller-item';
                    item.style.backgroundImage = `url(${photo.url})`;
                    container.appendChild(item);
                });
            };

            if (allPhotos.length > 0) {
                fillScroller(scroller1, r1Photos.length > 0 ? r1Photos : allPhotos);
                fillScroller(scroller2, r2Photos.length > 0 ? r2Photos : allPhotos);
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
} else {
    initHome();
}
