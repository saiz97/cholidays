"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class HomepageView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();

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
    }

    async renderCities() {
        let cities = await window.Core.model.getCities();
        for (const city of cities) {
            $("#cities_container").append(city.getListMarkup());
        }
    }
}