import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
    };

    return (
        <nav className="navbar">
            <div className="nav-container container">
                <div className="nav-logo">
                    <NavLink to="/">N. Didier</NavLink>
                </div>
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>{t('nav.home')}</NavLink></li>
                    <li><NavLink to="/photos" className={({ isActive }) => isActive ? "active" : ""}>{t('nav.photos')}</NavLink></li>
                    <li><NavLink to="/animation" className={({ isActive }) => isActive ? "active" : ""}>{t('nav.animation')}</NavLink></li>
                    <li><NavLink to="/parcours" className={({ isActive }) => isActive ? "active" : ""}>{t('nav.parcours')}</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>{t('nav.contact')}</NavLink></li>
                </ul>
                <button className="lang-btn" onClick={toggleLanguage}>
                    {i18n.language === 'fr' ? 'EN' : 'FR'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
