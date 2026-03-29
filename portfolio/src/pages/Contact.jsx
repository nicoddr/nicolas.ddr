import React from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="contact-page container fade-in">
            <div className="contact-card">
                <h1>{t('nav.contact')}</h1>
                <p className="contact-intro">
                    Vous souhaitez collaborer sur un projet ou simplement dire bonjour ? N'hésitez pas à me contacter !
                </p>

                <div className="contact-methods">
                    <a href="mailto:nicolas.didier2001@gmail.com" className="contact-method-card main-action">
                        <div className="icon-wrapper">✉️</div>
                        <h3>{t('contact.send_email')}</h3>
                        <p>nicolas.didier2001@gmail.com</p>
                    </a>

                    <a href="https://www.linkedin.com/in/nicolas-didier-france/" target="_blank" rel="noopener noreferrer" className="contact-method-card">
                        <div className="icon-wrapper">💼</div>
                        <h3>LinkedIn</h3>
                        <p>Mon profil professionnel</p>
                    </a>

                    <a href="https://www.instagram.com/nicolas.ddr.photos/" target="_blank" rel="noopener noreferrer" className="contact-method-card">
                        <div className="icon-wrapper">📸</div>
                        <h3>Instagram</h3>
                        <p>nicolas.ddr.photos</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
