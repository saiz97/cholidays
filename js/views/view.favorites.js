"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class FavoriteView extends Core_View {
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
    }

    getFavCitiesOfUser() {

    }

    getFavHotelsOfUser() {

    }

    async renderFavCities() {
        let cities = await window.Core.model.getCities();
        for (const city of cities) {
            city.hotels = await window.Core.model.getHotelsOfCity(city.name);
        }
        $("#cities_container").empty();
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

    async renderFavHotels() {
        await this.city.loadCityMap();
        $("#cities_detail_container").html(await this.city.getSingleMarkup());
        $("#city-hotels").empty();

        for (const hotel of this.city.hotels) {
            $("#city-hotels").append(await hotel.getListMarkup());
        }

        $(".favorite-city").unbind("click").on("click", function (e) {
            e.preventDefault();
            let c_id = $(this).parent().data("id");

            window.Core.model.getCity(c_id).then(async (res) => {
                await window.Core.model.changeCityFavStatusInIdb(res);
            });

            $(this).toggleClass("isFavors");
        });

        $(".favorite-hotel").unbind("click").on("click", function (e) {
            e.preventDefault();

            let h_id = $($(this).parents()[1]).data("id");
            window.Core.model.getHotel(h_id).then(async (res) => {
                await window.Core.model.changeHotelFavStatusInIdb(res);
            });

            $(this).toggleClass("isFavors");
        });
    }


    /*async renderFavoriteCities() {
       return await new Promise(resolve => {
           window.Core.model.idbReadAll("fav_cities", function (callback) {
               let user = window.localStorage.getItem("username");
               let res = [];
               callback.forEach(c => {
                   if (c.username === user) res.push(c);
               });
               resolve(res);
           });
       }).then((cities) => {
           let html = ``;
           cities.forEach((c) => {
               new Promise(resolve => {
                   resolve(window.Core.model.getCity(c.city_id));
               }).then(city => {
                   console.log(city);
                   html += `
                       <div class="accordion">
                           <h1>${city.name}</h1>
                           <h3>${city.country}</h3>
                       </div>
                       <div class="acc-city panel">

                       </div>
                       `;
                   $("#favorites-container").append(html);
               });
           });

       });
   }*/
}