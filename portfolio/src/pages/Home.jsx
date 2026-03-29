import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleHeroClick = () => {
        navigate('/photos');
    };

    return (
        <div className="home-page fade-in">
            {/* Hero / Continuous Photo scroller will go here */}
            <section className="hero-section" onClick={handleHeroClick}>
                <div className="hero-content">
                    <h1>{t('home.hero.title')}</h1>
                    <h2>{t('home.hero.subtitle')}</h2>
                </div>

                {/* Continuous 2-level scroller background (brick-like masonry) */}
                <div className="scroller-container">
                    {/* Temporary placeholders for images. We will hook this up to Firebase. */}
                    <div className="scroller-track row-1">
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                    </div>
                    <div className="scroller-track row-2">
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                        <div className="scroller-item"></div>
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="news-section container">
                <h2 className="section-title">{t('home.news.title')}</h2>
                <div className="news-box">
                    <p>Dernières expositions et projets à venir... (Placeholder for news content)</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
