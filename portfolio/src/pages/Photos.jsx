import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './Photos.css';

const Photos = () => {
    const { t } = useTranslation();
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        document.body.classList.add('photos-page-active');
        return () => {
            document.body.classList.remove('photos-page-active');
        };
    }, []);

    useEffect(() => {
        const photosRef = ref(db, 'photos');
        onValue(photosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedPhotos = Object.keys(data).map(key => ({
                    id: key,
                    src: data[key].url,
                    width: data[key].width || 1920,
                    height: data[key].height || 1080,
                    title: data[key].title,
                    description: data[key].description,
                    location: data[key].location,
                    date: data[key].date,
                    filters: data[key].filters || []
                }));
                setPhotos(loadedPhotos);
                setFilteredPhotos(loadedPhotos);
            } else {
                setPhotos([]);
                setFilteredPhotos([]);
            }
        });
    }, []);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredPhotos(photos);
        } else {
            setFilteredPhotos(photos.filter(p => p.filters.includes(activeFilter) || p.location === activeFilter));
        }
    }, [activeFilter, photos]);

    const allFilters = ['All', 'Nature', 'Urbain', 'Portrait', 'Paysage', 'Divers'];
    // Also add locations as filters
    const locations = [...new Set(photos.map(p => p.location).filter(Boolean))];
    const filtersAvailable = [...allFilters, ...locations];

    return (
        <div className="photos-container fade-in">
            <div className="filters">
                {filtersAvailable.map(f => (
                    <button
                        key={f}
                        className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f === 'All' ? t('photos.filters.all') :
                            f === 'Nature' ? t('photos.filters.nature') :
                                f === 'Urbain' ? t('photos.filters.urbain') :
                                    f === 'Portrait' ? t('photos.filters.portrait') :
                                        f === 'Paysage' ? t('photos.filters.paysage') :
                                            f === 'Divers' ? t('photos.filters.divers') : f}
                    </button>
                ))}
            </div>

            <div className="masonry-gallery">
                <PhotoAlbum
                    layout="masonry"
                    photos={filteredPhotos}
                    onClick={({ index }) => setIndex(index)}
                    columns={(containerWidth) => {
                        if (containerWidth < 400) return 1;
                        if (containerWidth < 800) return 2;
                        if (containerWidth < 1200) return 3;
                        return 4;
                    }}
                    spacing={16}
                />
            </div>

            <Lightbox
                slides={filteredPhotos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Captions]}
                captions={{
                    showToggle: true,
                    descriptionTextAlign: "center"
                }}
            />
        </div>
    );
};

export default Photos;
