"use strict";
import Core_SPA_Router from "./core.spa-router.js?v=0.1";
import Core_Translator from "./core.translator.js?v=0.1";
import Core_View from "./core.spa-view.js?v=0.1";
import Core_Utils from "./core.utils.js?v=0.1";
import Core_Model from "./core.model.js?v=0.1";

/**********************************************************************
 *     Class-Bundle for Web-Apps.
 *     App-Shell needs an ID "#core_app".
 *
 *     @param:
 *     webRoot - Give me the root-URL of your App
 *     templatesPath - Give me the Path to your templates
 *       relative to your webRoot.
 *     routes - Give me an Object with "slug" : "template" Routes
 *     ...languages - Give me all languages you want your App to support.
 *
 *     Neuwersch - 2020-03-25
 **********************************************************************/

export default class Core_App{
    constructor(webRoot, templatesPath, routes, ...languages){
        window.Core = this; //attach core to current window object
        this.system = {
            webRoot: webRoot, //Root-URL of the App
            templatesPath: templatesPath, //path to folder container our templates
            debugmode: false, //if actived, show debug logs in console
            defaultLanguage: 'de'
        };
        this.breadcrumbs = [];
        this.utils = new Core_Utils();
        this.translator = languages.length
            ? new Core_Translator(languages)
            : new Core_Translator(this.system.defaultLanguage);
        this.getParams = {};
        this.model = new Core_Model();

        this.initPageMarkup();
        this.router = new Core_SPA_Router(routes);
    }

    t(key) {
        return (this.translator.t(key));
    }

    initPageMarkup() {
        this.initHeader();
        this.initFooter();
    }

    async initHeader() {
        await Core_View.useTemplate(this.system.webRoot
            + this.system.templatesPath
            + "/header.tpl", document.getElementById("app_header"), "/header")
            .then(() => {
                let curruser = window.localStorage.getItem('username');
                if (curruser) {
                    $("#loggedInAs").show();
                    $("#login").hide();
                    $("#logout").show();
                    $("#currUser").text(curruser);
                }
        });
    }

    async initFooter() {
        await Core_View.useTemplate(this.system.webRoot
            + this.system.templatesPath
            + "/footer.tpl", document.getElementById("app_footer"), "/footer");
    }

    checkFirstBreadcrumb() {
        if (window.localStorage.getItem("prev") === "favs") {
            return  `<a href="#" class="favlink">${this.t("favorites")}</a>`;
        }

        return `<a href="#" class="homelink">${this.t("home")}</a>`;
    }
}