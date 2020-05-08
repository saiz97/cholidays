"use strict";

/*******************************************************
 *     Hash-based Routes for Single Page Applications.
 *     Routes can are treated like Views. Each Route is
 *     therefore bound to one single (unique) View.
 *
 *     Neuwersch - 2020-03-25
 *******************************************************/
const app = document.getElementById("core_app");

export default class Core_View{
    constructor(slug, template){
        this.slug = slug; //= last part of the url after #
        this.template = template;

        //everytime a page/window gets changed (url) this EventListener gets called
        window.addEventListener("templateChanged", this.listen.bind(this));
    }

    init() {
        if (window.Core.system.debugmode) {
            console.log("View loaded: " + this.slug);
        }
        this.initClickListener();
    }

    initClickListener() {

        $('.homelink').unbind("click").on("click", function (e) {
            e.preventDefault();
            window.location.hash = "/";
        });

        $('.favlink').unbind("click").on("click", function (e) {
            e.preventDefault();
            window.location.hash = "/favorites";
        });

        $(".lang").unbind("click").on("click", function () {
            window.Core.utils.setCookie("lang", $(this).attr('value'), 1);
            window.Core.translator.currentLanguage = $(this).attr('value');

            window.Core.initPageMarkup();
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        });
    }

    listen(e) {
        if (e.detail.slug === this.slug) {
            this.init();
        }
    }

    isActive() {
        //ist ein getParameter vorhanden?
        if (window.Core.utils.isEmpty(Core_View.getGetParameters())) {
            //kein Fragezeichen vorhanden
            return (window.location.hash.substr(1).replace('#', '') === this.slug);
        } else {
            let index = window.location.hash.substr(1).indexOf("?");
            return (window.location.hash.substr(1, index).replace('#', '') === this.slug);
        }
    }

    renderMarkup(){
        Core_View.useTemplate(window.Core.system.webRoot
            + window.Core.system.templatesPath
            + "/" + this.template + ".tpl", app, this.slug);
    }

    static useTemplate(templatePath, container, slug){
        //do promise
        return new Promise(resolve => {
            $.get(templatePath, function(tpl){
                let marker = /<%>/gi;
                let result;
                let firstIndex;
                let secondIndex;
                let marked = [];

                while ((result = marker.exec(tpl))) { //.exec for finding regex pattern in tpl
                    if (!firstIndex) firstIndex = result.index;
                    else {
                        secondIndex = result.index;
                        marked.push(result.input.substring(firstIndex + 3, secondIndex));
                        firstIndex = null;
                        secondIndex = null;
                    }
                }

                for (const markedElement of marked)
                    tpl = tpl.split('<%>' + markedElement + '<%>').join(window.Core.t(markedElement));

                container.innerHTML = tpl;

                window.Core.getParams = Core_View.getGetParameters();
                window.dispatchEvent(new CustomEvent("templateChanged", {detail: {slug: slug}}));
                resolve();
            });
        });
    }

    static getGetParameters() {
        let index = window.location.hash.substr(1).indexOf("?");
        if (index !== -1) {
            let parameters = window.location.hash.substr(index + 2);
            let result = parameters.split("&").reduce(function (result, item) {
                let parts = item.split("="); //array [0] = key [1] = value
                result[parts[0]] = parts[1];
                return result;
            }, {});
            return result;
        } else {
            return {};
        }
    }
}