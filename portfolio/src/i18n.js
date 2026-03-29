import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.photos": "Photo Projects",
      "nav.animation": "Animation",
      "nav.parcours": "Journey",
      "nav.contact": "Contact",
      "home.hero.title": "Nicolas Didier",
      "home.hero.subtitle": "Photographer & Animator",
      "home.news.title": "Latest News",
      "footer.contact": "Contact",
      "footer.social": "Socials",
      "footer.email": "Email me",
      "photos.filters.all": "All",
      "photos.filters.nature": "Nature",
      "photos.filters.urbain": "Urban",
      "photos.filters.portrait": "Portrait",
      "photos.filters.paysage": "Landscape",
      "photos.filters.divers": "Various",
      "admin.title": "Dashboard Admin",
      "contact.send_email": "Send me an email",
    }
  },
  fr: {
    translation: {
      "nav.home": "Page d’accueil",
      "nav.photos": "Projets photos",
      "nav.animation": "Animation",
      "nav.parcours": "Parcours",
      "nav.contact": "Contact",
      "home.hero.title": "Nicolas Didier",
      "home.hero.subtitle": "Photographe & Animateur",
      "home.news.title": "Dernières actualités",
      "footer.contact": "Contact",
      "footer.social": "Réseaux Sociaux",
      "footer.email": "Me contacter",
      "photos.filters.all": "Tout",
      "photos.filters.nature": "Nature",
      "photos.filters.urbain": "Urbain",
      "photos.filters.portrait": "Portrait",
      "photos.filters.paysage": "Paysage",
      "photos.filters.divers": "Divers",
      "admin.title": "Tableau de bord Admin",
      "contact.send_email": "Envoyer un e-mail",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // default language
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
