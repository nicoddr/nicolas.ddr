import React from 'react';
import { useTranslation } from 'react-i18next';
import { parcoursData } from '../data/parcoursData';
import './ContentPages.css';

const Parcours = () => {
    const { t } = useTranslation();

    return (
        <div className="content-page container fade-in">
            <div className="page-header">
                <h1>{t('nav.parcours')}</h1>
                <div className="header-line"></div>
            </div>

            <div className="content-body">
                <p className="intro-text">
                    Découvrez mon parcours académique et professionnel, qui m'a mené à forger mon expertise actuelle.
                </p>

                <div className="timeline-placeholder">
                    {parcoursData.map((item) => (
                        <div key={item.id} className="timeline-item">
                            <div className="timeline-date">{item.date}</div>
                            <h3>{item.title}</h3>
                            <div className="timeline-company">{item.company}</div>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Parcours;
