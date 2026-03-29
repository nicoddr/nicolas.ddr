// js/admin.js

function initAdmin() {
    const form = document.getElementById('adminForm');
    const db = window.firebaseDB;
    if (!form || !db) return setTimeout(initAdmin, 50);

    const successMsg = document.getElementById('successMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const url = document.getElementById('url').value;
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const aspectRatio = document.getElementById('aspectRatio').value;
        const description = document.getElementById('description').value;

        // Get filters
        const filters = [];
        document.querySelectorAll('.filter-cb:checked').forEach(cb => {
            filters.push(cb.value);
        });

        // Dimensions (approx based on ratio for placeholder purposes)
        const [w, h] = aspectRatio.split(':').map(Number);
        const baseSize = 800;
        const width = w > h ? baseSize : Math.round(baseSize * (w / h));
        const height = h > w ? baseSize : Math.round(baseSize * (h / w));

        const newPhoto = {
            url, title, date, location, width, height, filters, description,
            timestamp: Date.now()
        };

        const photosRef = window.firebaseRef(db, 'photos');
        window.firebasePush(photosRef, newPhoto).then(() => {
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }).catch((err) => {
            console.error("Erreur d'ajout:", err);
            alert("Erreur lors de l'ajout de la photo");
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
} else {
    initAdmin();
}
