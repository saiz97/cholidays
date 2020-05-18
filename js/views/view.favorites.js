"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class FavoriteView extends Core_View {
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        window.localStorage.setItem("prev", "favs");
        $(".homepage").removeClass("active");
        $(".favpage").addClass("active");
        this.renderFavCities();
    }



    //turn favored cities of idb to city objects
    async getFavCitiesObjects(favcities) {
        let cities = [];
        for (const fc of favcities) {
            let city = await window.Core.model.getCity(fc.city_id);
            city.hotels = await window.Core.model.getHotelsOfCity(city.name);
            cities.push(city);
        }
        return cities;
    }

    //turn favored hotels of idb to hotel objects
    async getFavHotelsObjects(favhotels) {
        let hotels = [];
        for (const fh of favhotels) {
            hotels.push(await window.Core.model.getHotel(fh.hotel_id));
        }
        return hotels;
    }

    async renderFavCities() {
        let cities = await this.getFavCitiesObjects(
            await window.Core.model.getFavCitiesOfUser());

        let hotels = await this.getFavHotelsObjects(
            await window.Core.model.getFavHotelsOfUser());

        $("#favorite-cities-container").empty();
        $("#favorite-hotels-container").empty();

        for (const city of cities) {
            $("#favorite-cities-container").append(await city.getListMarkup());
        }

        for (const hotel of hotels) {
            $("#favorite-hotels-container").append(await hotel.getListMarkup());
        }

        this.initClickListener();
    }

    initClickListener() {
        super.initClickListener();

        $(".favorite-city").unbind("click").on("click", async function (e) {
            e.preventDefault();
            let c_id = $(this).parent().data("id");

            await window.Core.model.getCity(c_id).then(async (res) => {
                await window.Core.model.changeCityFavStatusInIdb(res);
            });

            $(this).toggleClass("isFavors");
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        });

        $(".favorite-hotel").unbind("click").on("click", async function (e) {
            e.preventDefault();

            let h_id = $($(this).parents()[1]).data("id");
            await window.Core.model.getHotel(h_id).then(async (res) => {
                await window.Core.model.changeHotelFavStatusInIdb(res);
            });

            $(this).toggleClass("isFavors");
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        });
    }
}