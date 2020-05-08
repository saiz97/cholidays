"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class HomepageView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        $(".homepage").addClass("active");
        $(".favpage").removeClass("active");

        $("#login").unbind("click").on("click", function (e) {
            e.preventDefault();
            window.location.hash = "/login";
        });

        $("#logout").unbind("click").on("click", function (e) {
            e.preventDefault();
            $("#login").show();
            $("#logout").hide();

            window.localStorage.removeItem('username');
            $("#loggedInAs").hide();
            $("#currUser").text("");

            window.location.hash = "/login";
        });

        this.renderCities().then(function () {
            if (window.Core.system.debugmode) {
                console.log("Cities successfully rendered");
            }
        });
    }

    async renderCities() {
        $("#cities_container").empty();
        console.log("hi");
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
                await window.Core.model.changeCityFavStatusInIdb(res);
            });

            $(this).toggleClass("isFavors");
        });
    }
}