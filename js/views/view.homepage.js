"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class HomepageView extends Core_View{
    constructor(slug, template) {
        super(slug, template);

        this.breadcrumb = {name:"bc_home", path:slug};
    }

    init() {
        super.init();

        $('a[href="#"]').unbind("click").on("click", function (e) {
            e.preventDefault();
            window.location.hash = "/";
        });

        $("#login").unbind("click").on("click", function (e) {
            e.preventDefault();
            window.location.hash = "/login";
        });

        $("#logout").unbind("click").on("click", function (e) {
            e.preventDefault();
            $("#login").show();
            $("#logout").hide();
            window.location.hash = "/login";
        });

        this.renderCities().then(function () {
            if (window.Core.system.debugmode) {
                console.log("Cities successfully rendered");
            }
        });

        this.setBreadcrumb(this.breadcrumb, this.breadcrumb.path)
    }

    setBreadcrumb(breadcrumb, path) {
        super.setBreadcrumb(breadcrumb, path);
    }

    async renderCities() {
        let cities = await window.Core.model.getCities();
        for (const city of cities) {
            city.hotels = await window.Core.model.getHotelsOfCity(city.name);
        }
        $("#cities_container").empty();
        for (const city of cities) {
            $("#cities_container").append(await city.getListMarkup());
        }
    }
}