"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class FavoriteView extends Core_View {
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();

        console.log("favorite view");
        this.renderFavCities();
    }
    
    async addHotelsToCities(favcities, favhotels) {
        let cities = [];

        for (const fc of favcities) {
            let city = await window.Core.model.getCity(fc.city_id);
            let hotels = await window.Core.model.getHotelsOfCity(city.name);

            city.hotels = this.checkIfFavoriteHotel(hotels, favhotels);

            console.log(city);
            cities.push(city);
        }

        return cities;
    }

    checkIfFavoriteHotel(hotels, favhotels) {
        console.log(hotels, favhotels);
        let result = [];
        for (const hotel of hotels) {
            for (const fav of favhotels) {
                if (fav.hotel_id === hotel._id) result.push(hotel);
            }
        }
        return result;
    }
    
    async renderFavCities() {
        let favcities = await window.Core.model.getFavCitiesOfUser();
        let favhotels = await window.Core.model.getFavHotelsOfUser();
        
        let cities = await this.addHotelsToCities(favcities, favhotels);

        $("#favorite-cities-container").empty();

        for (const city of cities) {
            $("#favorite-cities-container").append(await city.getListMarkup());
            for (const hotel of city.hotels) {
                $("#favorite-hotels-container").append(await hotel.getListMarkup());
            }
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