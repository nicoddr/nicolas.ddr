// js/admin-manage.js

let allPhotos = {};

function initAdminManage() {
    const db = window.firebaseDB;
    if (!db) return setTimeout(initAdminManage, 50);

    const photosRef = window.firebaseRef(db, 'photos');
    const grid = document.getElementById('photo-grid');
    const countEl = document.getElementById('photo-count');

    // Fetch realtime updates
    window.firebaseOnValue(photosRef, (snapshot) => {
        grid.innerHTML = '';
        allPhotos = snapshot.val() || {};

        const keys = Object.keys(allPhotos);
        countEl.innerText = keys.length + " photo(s)";

        if (keys.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">Aucune photo dans la base de données.</div>';
            return;
        }

        // Display newest first
        keys.reverse().forEach(key => {
            const photo = allPhotos[key];

            const card = document.createElement('div');
            card.className = 'photo-card fade-in';

            card.innerHTML = `
                <a href="${photo.url}" target="_blank" title="Ouvrir la photo dans un nouvel onglet">
                    <img src="${photo.url}" alt="${photo.title || 'Image'}" loading="lazy">
                </a>
                <div class="photo-info">
                    <div class="photo-title">${photo.title || 'Sans titre'}</div>
                    <div class="photo-details">
                        ${photo.date || 'Pas de date'} • ${photo.location || 'Pas de lieu'}<br>
                        Filtres: ${(photo.filters || []).join(', ')}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-edit" onclick="openEditModal('${key}')">Modifier</button>
                    <button class="btn btn-delete" onclick="deletePhoto('${key}')">Supprimer</button>
                </div>
            `;
            grid.appendChild(card);
        });
    });

    // Close Modal Event
    document.getElementById('closeModal').addEventListener('click', closeEditModal);

    // Edit Form Submit
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', handleEditSubmit);
}

window.deletePhoto = function (id) {
    if (confirm("⚠️ Êtes-vous sûr de vouloir supprimer définitivement cette photographie de la base de données ?")) {
        const db = window.firebaseDB;
        const photoRef = db.ref('photos/' + id);
        photoRef.remove().then(() => {
            showSuccessMsg("Corbeille : Photo supprimée.");
        }).catch(err => {
            console.error(err);
            alert("Erreur lors de la suppression.");
        });
    }
}

window.openEditModal = function (id) {
    const photo = allPhotos[id];
    if (!photo) return;

    document.getElementById('edit-id').value = id;
    document.getElementById('edit-url').value = photo.url || '';
    document.getElementById('edit-title').value = photo.title || '';
    document.getElementById('edit-date').value = photo.date || '';
    document.getElementById('edit-location').value = photo.location || '';
    document.getElementById('edit-description').value = photo.description || '';

    // Guess aspect ratio based on width/height or default to 16:9
    const ratioSelect = document.getElementById('edit-aspectRatio');
    ratioSelect.value = "16:9"; // default
    if (photo.width && photo.height) {
        // Simple logic for standard ratios previously set. Could be complex, simplified for demo.
        if (photo.width === photo.height) ratioSelect.value = "1:1";
        else if (photo.width > photo.height) { // Landscape
            if (Math.abs((photo.width / photo.height) - (16 / 9)) < 0.1) ratioSelect.value = "16:9";
            else if (Math.abs((photo.width / photo.height) - (4 / 3)) < 0.1) ratioSelect.value = "4:3";
            else if (Math.abs((photo.width / photo.height) - (3 / 2)) < 0.1) ratioSelect.value = "3:2";
        } else { // Portrait
            if (Math.abs((photo.height / photo.width) - (16 / 9)) < 0.1) ratioSelect.value = "9:16";
            else if (Math.abs((photo.height / photo.width) - (4 / 3)) < 0.1) ratioSelect.value = "3:4";
            else if (Math.abs((photo.height / photo.width) - (3 / 2)) < 0.1) ratioSelect.value = "2:3";
        }
    }

    // Filters
    const safeFilters = photo.filters || [];
    document.querySelectorAll('.edit-filter').forEach(cb => {
        cb.checked = safeFilters.includes(cb.value);
    });

    document.getElementById('editModal').classList.add('active');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

function handleEditSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;

    // Recalculate dimensions
    const aspectRatio = document.getElementById('edit-aspectRatio').value;
    const [w, h] = aspectRatio.split(':').map(Number);
    const baseSize = 800;
    const width = w > h ? baseSize : Math.round(baseSize * (w / h));
    const height = h > w ? baseSize : Math.round(baseSize * (h / w));

    // Get filters
    const filters = [];
    document.querySelectorAll('.edit-filter:checked').forEach(cb => {
        filters.push(cb.value);
    });

    const updatedData = {
        url: document.getElementById('edit-url').value,
        title: document.getElementById('edit-title').value,
        date: document.getElementById('edit-date').value,
        location: document.getElementById('edit-location').value,
        description: document.getElementById('edit-description').value,
        width, height, filters
    };

    const db = window.firebaseDB;
    db.ref('photos/' + id).update(updatedData).then(() => {
        closeEditModal();
        showSuccessMsg("Succès : Photo mise à jour.");
    }).catch(err => {
        console.error(err);
        alert("Erreur lors de la mise à jour.");
    });
}

function showSuccessMsg(msg) {
    const successMsg = document.getElementById('successMsg');
    successMsg.innerText = msg;
    successMsg.style.display = 'block';
    successMsg.style.animation = 'none';
    successMsg.offsetHeight; // force reflow
    successMsg.style.animation = 'slideInUp 0.3s ease-out forwards';

    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminManage);
} else {
    initAdminManage();
}
