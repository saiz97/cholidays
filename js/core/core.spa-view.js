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
    }

    listen(e) {
        if (e.detail.slug === this.slug) {
            this.init();
        }
    }

    isActive() {
        return (window.location.hash.substr(1).replace('#', '') === this.slug);
    }

    renderMarkup(){
        Core_View.useTemplate(window.Core.system.webRoot + window.Core.system.templatesPath + "/" + this.template + ".tpl", app, this.slug);
    }

    static useTemplate(templatePath, container, slug) {
        $.get(templatePath, function(tpl){
                let marker = /<%>/gi;
                let result;
                let firstIndex;
                let secondIndex;
                let marked = [];

                while ((result = marker.exec(tpl))) {
                    if (!firstIndex) firstIndex = result.index;
                    else secondIndex = result.index;

                    if (secondIndex) {
                        marked.push(result.input.substring(firstIndex+3, secondIndex));
                        firstIndex = null;
                        secondIndex = null;
                    }
                }

                for (const markedElement of marked)
                    tpl = tpl.split('<%>'+markedElement+'<%>').join(window.Core.t(markedElement));

                container.innerHTML = tpl;
                window.dispatchEvent(new CustomEvent("templateChanged", {detail: {slug: slug}}))
            })
    }
}