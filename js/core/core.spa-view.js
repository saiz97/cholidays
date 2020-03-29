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
        this.slug = slug;
        this.template = template;

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
        let self = this;

        $.get(window.Core.system.webRoot+window.Core.system.templatesPath+"/"+this.template+".tpl", function(tpl){
            app.innerHTML = tpl;
            window.dispatchEvent(new CustomEvent("templateChanged", {detail: {slug: self.slug}}))
        })

    }
}