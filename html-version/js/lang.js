const translations = {
    fr: {
        "nav.home": "Page d'accueil",
        "nav.photos": "Projets photos",
        "nav.animation": "Animation",
        "nav.parcours": "Parcours",
        "nav.contact": "Contact",
        "home.hero.title": "Nicolas Didier",
        "home.hero.subtitle": "Photographe & Animateur",
        "home.news.title": "Dernières actualités",
        "footer.contact": "Contact",
        "footer.email": "Me contacter",
        "footer.social": "Réseaux Sociaux",
        "photos.filters.all": "Tout",
        "photos.filters.nature": "Nature",
        "photos.filters.urbain": "Urbain",
        "photos.filters.portrait": "Portrait",
        "photos.filters.paysage": "Paysage",
        "photos.filters.divers": "Divers",
        "contact.title": "Contact",
        "contact.intro": "Vous souhaitez collaborer sur un projet ou simplement dire bonjour ? N'hésitez pas à me contacter !",
        "contact.send_email": "Envoyer un e-mail",
        "admin.title": "Tableau de Bord Admin"
    },
    en: {
        "nav.home": "Home",
        "nav.photos": "Photo Projects",
        "nav.animation": "Animation",
        "nav.parcours": "Journey",
        "nav.contact": "Contact",
        "home.hero.title": "Nicolas Didier",
        "home.hero.subtitle": "Photographer & Animator",
        "home.news.title": "Latest News",
        "footer.contact": "Contact",
        "footer.email": "Email me",
        "footer.social": "Socials",
        "photos.filters.all": "All",
        "photos.filters.nature": "Nature",
        "photos.filters.urbain": "Urban",
        "photos.filters.portrait": "Portrait",
        "photos.filters.paysage": "Landscape",
        "photos.filters.divers": "Various",
        "contact.title": "Contact",
        "contact.intro": "Interested in collaborating or just want to say hi? Don't hesitate to reach out!",
        "contact.send_email": "Send me an email",
        "admin.title": "Admin Dashboard"
    }
};

let currentLang = localStorage.getItem('i18n_lang') || 'fr';

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // Check if placehoder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder) el.placeholder = translations[currentLang][key];
            } else {
                el.innerText = translations[currentLang][key];
            }
        }
    });

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.innerText = currentLang === 'fr' ? 'EN' : 'FR';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('i18n_lang', currentLang);
    applyTranslations();
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();

    // Highlight active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
});
