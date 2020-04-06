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
            if ($(this).text().toLowerCase() === 'de') {
                window.Core.utils.setCookie("lang", "de", 1);
            } else if ($(this).text().toLowerCase() === 'en') {
                window.Core.utils.setCookie("lang", "en", 1);
            }
            location.reload();
        });
    }
}

Core_language.en = {
    username: "username",
    password: "password",
    logout: "logout",
    login: "login"
};

Core_language.de = {
    username: "Benutzername",
    password: "Passwort",
    logout: "Ausloggen",
    login: "Einloggen"
};