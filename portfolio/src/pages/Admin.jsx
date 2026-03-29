import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import './Admin.css';

const Admin = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: '',
        date: '',
        location: '',
        aspectRatio: '16:9',
        filters: []
    });
    const [successMsg, setSuccessMsg] = useState('');

    const availableFilters = ['Nature', 'Urbain', 'Portrait', 'Paysage', 'Divers'];
    const ratios = ['16:9', '9:16', '4:3', '3:4', '1:1', '3:2', '2:3'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterToggle = (filter) => {
        setFormData(prev => {
            if (prev.filters.includes(filter)) {
                return { ...prev, filters: prev.filters.filter(f => f !== filter) };
            }
            return { ...prev, filters: [...prev.filters, filter] };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate approximate width/height based on aspect ratio
        const [w, h] = formData.aspectRatio.split(':').map(Number);
        const baseSize = 800; // arbitrary base
        const width = w > h ? baseSize : Math.round(baseSize * (w / h));
        const height = h > w ? baseSize : Math.round(baseSize * (h / w));

        const photosRef = ref(db, 'photos');
        const newPhoto = {
            url: formData.url,
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
            width,
            height,
            filters: formData.filters,
            timestamp: Date.now()
        };

        push(photosRef, newPhoto)
            .then(() => {
                setSuccessMsg('Photo ajoutée avec succès !');
                setFormData({
                    url: '', title: '', description: '', date: '', location: '', aspectRatio: '16:9', filters: []
                });
                setTimeout(() => setSuccessMsg(''), 3000);
            })
            .catch((err) => {
                console.error("Erreur d'ajout:", err);
            });
    };

    return (
        <div className="admin-page container fade-in">
            <div className="admin-card">
                <h1>{t('admin.title', 'Tableau de bord Admin')}</h1>
                <p>Ajouter une nouvelle photographie au portfolio.</p>

                {successMsg && <div className="success-msg">{successMsg}</div>}

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Image URL *</label>
                        <input type="url" name="url" value={formData.url} onChange={handleChange} required placeholder="https://..." />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Titre</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Lieu / Pays</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: France, Paris..." />
                        </div>
                        <div className="form-group">
                            <label>Format d'image *</label>
                            <select name="aspectRatio" value={formData.aspectRatio} onChange={handleChange} required>
                                {ratios.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Filtres (Tags)</label>
                        <div className="filter-checkboxes">
                            {availableFilters.map(f => (
                                <label key={f} className="checkbox-label">
                                    <input type="checkbox" checked={formData.filters.includes(f)} onChange={() => handleFilterToggle(f)} />
                                    {f}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Ajouter la Photo</button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
