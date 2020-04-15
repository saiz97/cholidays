"use strict";
import City from "../classes/class.city.js?v=0.1"
const cities_json = "./cities.json";
const hotels_json = "./hotels.json";

export default class Core_Model {
    constructor() {
        //offline verfügbare cities
        //this.cities = new Map();
    }

    getCities() {
        return new Promise(resolve => {
            $.getJSON(cities_json, function (data) {
                let cities = [];
                for (let city of data) {
                    cities.push(new City(city));
                }
                resolve(cities);
            });
        });
    }

    //getCityBy("name", "Paris") --> Gets the city named Paris
    getCityBy(key, value) {
        return new Promise(resolve => {
            $.getJSON(cities_json, function (data) {
                for (let city of data) {
                    if (city[key] === value) {
                        resolve(new City(city));
                    }
                }
            });
        });
    }

    async getCity(id) {
        return await this.getCityBy("_id", id);
    }

    getHotels() {
        return new Promise(resolve => {
            $.getJSON(hotels_json, function (data) {
                let hotels = [];
                for (let hotel of data) {
                    hotels.push(new City(hotel));
                }
                resolve(hotels);
            });
        });
    }

    getHotelOfCity() {

    }

    getHotel(id) {

    }
};