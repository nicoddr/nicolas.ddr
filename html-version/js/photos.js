// js/photos.js
let allPhotos = [];
let currentFilter = 'All';

// Render Grid with staggered animations and photo overlays
function renderGrid() {
    const grid = document.getElementById('masonry-grid');
    grid.innerHTML = '';

    const filtered = currentFilter === 'All'
        ? allPhotos
        : allPhotos.filter(p => (p.filters && p.filters.includes(currentFilter)) || p.location === currentFilter);

    // Update lightbox photo list
    window.lightboxPhotos = filtered;

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="width:100%; text-align:center; color:#94a3b8; padding: 2rem;">Aucune photo trouvée.</div>';
        return;
    }

    filtered.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'masonry-item';
        item.style.animationDelay = `${idx * 0.05}s`;
        item.onclick = () => window.openLightbox(idx);

        const img = document.createElement('img');
        img.src = photo.url;
        img.loading = "lazy";
        img.alt = photo.title || "Photographie";

        // Photo overlay with title & category
        const overlay = document.createElement('div');
        overlay.className = 'photo-overlay';
        if (photo.title) {
            const h4 = document.createElement('h4');
            h4.textContent = photo.title;
            overlay.appendChild(h4);
        }
        if (photo.category || photo.location) {
            const span = document.createElement('span');
            span.textContent = photo.category || photo.location || '';
            overlay.appendChild(span);
        }

        item.appendChild(img);
        item.appendChild(overlay);
        grid.appendChild(item);
    });
}

// Handle Filters
function setupFilters(locations) {
    const container = document.getElementById('filters-container');
    const existingBtns = container.querySelectorAll('.filter-btn');

    // Add location filters
    locations.forEach(loc => {
        if (!loc) return;
        // Check if already exists
        const exists = Array.from(existingBtns).find(b => b.getAttribute('data-filter') === loc);
        if (!exists) {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.setAttribute('data-filter', loc);
            btn.innerText = loc;
            container.appendChild(btn);
        }
    });

    // Add click events with smooth transition
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');

            // Fade out then render
            const grid = document.getElementById('masonry-grid');
            grid.style.opacity = '0';
            grid.style.transform = 'translateY(10px)';
            grid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

            setTimeout(() => {
                renderGrid();
                requestAnimationFrame(() => {
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateY(0)';
                });
            }, 250);
        });
    });
}

// Load Data
function initPhotos() {
    const db = window.firebaseDB;
    if (!db) return setTimeout(initPhotos, 50);
    const photosRef = window.firebaseRef(db, 'photos');

    window.firebaseOnValue(photosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            allPhotos = Object.keys(data).map((key, index) => {
                return { id: key, originalIndex: index, ...data[key] };
            });

            // Extract unique locations for filters
            const locations = [...new Set(allPhotos.map(p => p.location).filter(Boolean))];
            setupFilters(locations);
            renderGrid();
        } else {
            document.getElementById('masonry-grid').innerHTML = '<div style="width:100%; text-align:center; color:#94a3b8;">Aucune photo dans la base de données.</div>';
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotos);
} else {
    initPhotos();
}
