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
        let cities = await window.Core.model.getCities();
        for (const city of cities) {
            city.hotels = await window.Core.model.getHotelsOfCity(city.name);
        }
        $("#cities_container").empty();
        for (const city of cities) {
            $("#cities_container").append(await city.getListMarkup());
        }

        //do city favorite stuff
        let self = this;
        $(".favorite-city").unbind("click").on("click", function (e) {
            e.preventDefault();
            let c_id = $(this).parent().data("id");

            window.Core.model.getCity(c_id).then(async (res) => {
                await self.changeCityFavStatusInIdb(res);
            });

            $(this).toggleClass("isFavors");
        });
    }

    changeCityFavStatusInIdb(city) {
        let username = window.localStorage.getItem("username");
        let c_name = city.name;
        let c_country = city.country;
        let c_id = city._id;
        let obj_key = username+"&"+c_id;
        let favObject = {_id: obj_key, city_id: c_id, name: c_name, country: c_country, username: username};

        window.Core.model.idbReadByKey("fav_cities", obj_key, (res) => {
            if (res === undefined) window.Core.model.idbAdd("fav_cities", favObject);
            else window.Core.model.idbDelete("fav_cities", obj_key);
        });
    }
}