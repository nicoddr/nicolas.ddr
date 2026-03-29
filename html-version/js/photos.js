// js/photos.js
let allPhotos = [];
let currentFilter = 'All';

// Lighbox functions
window.openLightbox = function (index) {
    const photo = allPhotos[index];
    if (!photo) return;

    document.getElementById('lightbox-img').src = photo.url;
    document.getElementById('lb-title').innerText = photo.title || '';
    document.getElementById('lb-desc').innerText = photo.description || '';

    let meta = [];
    if (photo.location) meta.push(photo.location);
    if (photo.date) meta.push(photo.date);
    document.getElementById('lb-meta').innerText = meta.join(' • ');

    document.getElementById('lightbox').classList.add('active');
};

window.closeLightbox = function () {
    document.getElementById('lightbox').classList.remove('active');
};

// Render Grid
function renderGrid() {
    const grid = document.getElementById('masonry-grid');
    grid.innerHTML = '';

    const filtered = currentFilter === 'All'
        ? allPhotos
        : allPhotos.filter(p => (p.filters && p.filters.includes(currentFilter)) || p.location === currentFilter);

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="width:100%; text-align:center; color:#94a3b8; padding: 2rem;">Aucune photo trouvée.</div>';
        return;
    }

    filtered.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'masonry-item fade-in';
        item.onclick = () => window.openLightbox(photo.originalIndex);

        const img = document.createElement('img');
        img.src = photo.url;
        img.loading = "lazy";
        img.alt = photo.title || "Photographie";

        item.appendChild(img);
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

    // Add click events
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderGrid();
        });
    });
}

// Load Data
function initPhotos() {
    const db = window.firebaseDB;
    if (!db) return setTimeout(initPhotos, 50); // Attend que Firebase soit chargé
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

    // Close lightbox on click outside image
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') window.closeLightbox();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotos);
} else {
    initPhotos();
}
