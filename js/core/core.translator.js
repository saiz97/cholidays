"use strict";

let Core_language = {};

export default class Core_Translator {
    constructor(...languages) {
        this.allowedLanguages = languages;
        this.currentLanguage = window.Core.utils.getCookie("lang") || window.Core.system.defaultLanguage;
    }

    t(key, language = this.currentLanguage) {
        //TODO: using disallowed languages --> Bonuspunkte
        return (typeof Core_language[language][key] === "undefined") ? "-- missing translation: " + key + " --" : Core_language[language][key];
    }
}

Core_language.en = {
    en: "englisch",
    de: "german",
    username: "username",
    password: "password",
    logout: "logout",
    login: "login",
    user: "currently logged in as: ",
    home: "Homepage",
    favorites: "Favorites",
    hello: "To Travel is to Live.",
    enjoy: "Let's go on a trip!",
    visithotelsheader: "Visit our Hotels!",
    country: "Country: ",
    nickname: "Nickname: ",
    amenities: "Amenities",
    bc_home: "Homepage",
    bc_city: "Citydescription",
    bc_hotel: "Hoteldescription",
    like: "I like this!"
};

Core_language.de = {
    en: "Englisch",
    de: "Deutsch",
    username: "Benutzername",
    password: "Passwort",
    logout: "Ausloggen",
    login: "Einloggen",
    user: "zurzeit eingeloggt als: ",
    home: "Startseite",
    favorites: "Favoriten",
    hello: "Reisen bedeutet Leben.",
    enjoy: "Lass das Abenteuer beginnen!",
    visithotelsheader: "Besuchen Sie unsere Hotels!",
    country: "Land: ",
    nickname: "Wird auch bezeichnet als: ",
    amenities: "Zusatzleistungen",
    bc_home: "Startseite",
    bc_city: "Länderbeschreibung",
    bc_hotel: "Hotelbeschreibung",
    like: "Gefällt mir!"
};