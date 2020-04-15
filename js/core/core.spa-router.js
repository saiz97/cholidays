"use strict";

/*******************************************************
 *     Hash-based router for Single Page Applications.
 *     Handles Routes behind a '/#/' to your convenience.
 *     First Route will be handled as homeRoute.
 *     Second Route will be handled as 404Route;
 *
 *     Neuwersch - 2020-03-25
 *******************************************************/
export default class Core_SPA_Router{
    constructor(routes, route404 = undefined){
        if(window.Core.system.debugmode)
            console.log(routes);

        this.routes = routes;
        this.route404 = route404;
        this.homeRoute = routes[0];

        this.init();
    }

    init() {
        window.removeEventListener('hashchange', this.hashChanged);
        window.addEventListener('hashchange', this.hashChanged.bind(this));
        this.hashChanged();
    }

    hashChanged() {
        window.Core.initPageMarkup();
        if (window.location.hash.length > 2) {
            //iterate all existing routes
            for (const route of this.routes) {
                if (route.isActive()) {
                    route.renderMarkup(); //route loads its template
                    return;
                }
            }
            //-> 404 or homepage
            if (this.route404) {
                window.location.hash = this.route404.slug;
            } else {
                if (window.Core.system.debugmode)
                    console.log("Didn't find page" + window.location.hash + ", but hey there is a homepage!")
                window.location.hash = this.homeRoute.slug;
            }
        } else {
            window.location.hash = this.homeRoute.slug;
            this.homeRoute.renderMarkup();
        }
    }


}

