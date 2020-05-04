"use strict";

let Core_language = {};

export default class Core_Translator {
    constructor(...languages) {
        this.allowedLanguages = languages;
        this.currentLanguage = window.Core.utils.getCookie("lang") || window.Core.system.defaultLanguage;
        this.changeLanguageOnClickHandler();
    }

    t(key, language = this.currentLanguage) {
        //TODO: using disallowed languages --> Bonuspunkte
        return (typeof Core_language[language][key] === "undefined") ? "-- missing translation: " + key + " --" : Core_language[language][key];
    }

    changeLanguageOnClickHandler() {
        $(document).on("click", ".lang", function () {

            if ($(this).attr('value') === "de") {
                window.Core.utils.setCookie("lang", "de", 1);
                window.Core.translator.currentLanguage = "de";
            } else if ($(this).attr('value') === "en") {
                window.Core.utils.setCookie("lang", "en", 1);
                window.Core.translator.currentLanguage = "en";
            }

            window.Core.initPageMarkup();
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        });
    }
}

Core_language.en = {
    en: "englisch",
    de: "german",
    username: "username",
    password: "password",
    logout: "logout",
    login: "login",
    visithotelsheader: "Visit our Hotels!",
    country: "Country: ",
    nickname: "Nickname: ",
    amenities: "Amenities"
};

Core_language.de = {
    en: "Englisch",
    de: "Deutsch",
    username: "Benutzername",
    password: "Passwort",
    logout: "Ausloggen",
    login: "Einloggen",
    visithotelsheader: "Besuchen Sie unsere Hotels!",
    country: "Land: ",
    nickname: "Wird auch bezeichnet als: ",
    amenities: "Zusatzleistungen"
};