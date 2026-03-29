import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>{t('footer.contact')}</h3>
                    <p>
                        <a href="mailto:nicolas.didier2001@gmail.com" className="email-link">
                            <FaEnvelope /> {t('footer.email')}
                        </a>
                    </p>
                </div>
                <div className="footer-section">
                    <h3>{t('footer.social')}</h3>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/nicolas-didier-france/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://www.instagram.com/nicolas.ddr.photos/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Nicolas Didier.</p>
            </div>
        </footer>
    );
};

export default Footer;
