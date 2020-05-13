"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class HomepageView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        window.localStorage.setItem("prev", "home");
        $(".homepage").addClass("active");
        $(".favpage").removeClass("active");

        this.renderCities().then(function () {
            if (window.Core.system.debugmode) {
                console.log("Cities successfully rendered");
            }
        });
    }

    toggleSnackbarMessage() {
        super.toggleSnackbarMessage();
    }

    async renderCities() {
        $("#cities_container").empty();
        let self = this;
        let cities = await window.Core.model.getCities();
        for (const city of cities) {
            city.hotels = await window.Core.model.getHotelsOfCity(city.name);
        }
        for (const city of cities) {
            $("#cities_container").append(await city.getListMarkup());
        }

        //do city favorite stuff
        $(".favorite-city").unbind("click").on("click", function (e) {
            e.preventDefault();
            let c_id = $(this).parent().data("id");

            window.Core.model.getCity(c_id).then(async (res) => {
                if ((await window.Core.model.changeCityFavStatusInIdb(res)) === false)
                    self.toggleSnackbarMessage();
            });

            $(this).toggleClass("isFavors");
        });
    }
}