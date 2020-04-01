"use strict";

let Core_language = {};

export default class Core_Translator {
    constructor(...languages) {
        this.allowedLanguages = languages;
        this.currentLanguage = window.Core.utils.getCookie("language") || window.Core.system.defaultLanguage;
        //this.currentLanguage = "de";
    }

    t(key, language = this.currentLanguage) {
        //TODO: using disallowed languages --> Bonuspunkte
        return (typeof Core_language[language][key] === "undefined") ? "-- missing translation: " + key + " --" : Core_language[language][key];
    }
}

Core_language.en = {
    username: "username",
    password: "password",
    logout: "logout"
};

Core_language.de = {
    username: "Benutzername",
    password: "Passwort",
    logout: "Ausloggen"
};

Core_Translator.fr = {
    logout: "Se déconnecter"
};