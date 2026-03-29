import React from 'react';
import { useTranslation } from 'react-i18next';
import { animationData } from '../data/animationData';
import './ContentPages.css';

const Animation = () => {
    const { t } = useTranslation();

    return (
        <div className="content-page container fade-in">
            <div className="page-header">
                <h1>{t('nav.animation')}</h1>
                <div className="header-line"></div>
            </div>

            <div className="content-body">
                <p className="intro-text">
                    Une sélection de mes travaux d'animation et de motion design.
                </p>

                <div className="timeline-placeholder">
                    {animationData.map((item) => (
                        <div key={item.id} className="timeline-item">
                            <div className="timeline-date">{item.date} • {item.type}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            {item.videoUrl && (
                                <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="watch-btn">
                                    Voir la vidéo
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Animation;
