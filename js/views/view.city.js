"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class CityView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();

        if (window.Core.utils.isEmpty(window.Core.getParams["id"])
            || window.Core.model.getCity(window.Core.getParams["id"]) === false) {
            window.location.hash = "/"; //lead back to homepage
        } else {
            let self = this;
            window.Core.model.getCity(window.Core.getParams["id"]).then(async function (response) {
                self.city = response;
                self.city.hotels = await window.Core.model.getHotelsOfCity(self.city.name);
                await self.render();
                console.log("Citydetail successfully rendered");
            });
        }
    }

    async render() {
        await this.city.loadCityMap();
        $("#cities_detail_container").html(await this.city.getSingleMarkup());
        $("#city-hotels").empty();

        for (const hotel of this.city.hotels) {
            $("#city-hotels").append(await hotel.getListMarkup());
        }

        this.initClickListener();
    }

    initClickListener() {
        super.initClickListener();

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
}