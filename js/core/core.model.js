"use strict";
import City from "../classes/class.city.js?v=0.1"
import Hotel from "../classes/class.hotel.js?v=0.1";
const cities_json = "./cities.json";
const hotels_json = "./hotels.json";

const dbName = "c-holidays";
const dbVersion = 1;

export default class Core_Model {
    constructor() {
        this.idb = window.indexedDB
            || window.mozIndexedDB
            || window.webkitIndexedDB
            || window.msIndexedDB;

        this.user = {
            favorites: {
                cities: [],
                hotels: []
            }
        }
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


    /*============HOTELS============*/
    getHotelsOfCity(cityname) {
        return new Promise(resolve => {
            $.getJSON(hotels_json, function (data) {
                let hotels = [];
                for (let hotel of data) {
                    if (hotel.city === cityname) {
                        hotels.push(new Hotel(hotel));
                    }
                }
                resolve(hotels);
            });
        });
    }

    getHotelBy(key, value) {
        return new Promise(resolve => {
            $.getJSON(hotels_json, function (data) {
                for (let hotel of data) {
                    if (hotel[key] === value) {
                        resolve(new Hotel(hotel));
                    }
                }
            });
        });
    }

    async getHotel(id) {
        return await this.getHotelBy("_id", id);
    }

    static upgradeDB(e){
        let db = e.target.result;
        let user = db.createObjectStore("user", {keyPath: "_id"});
        user.createIndex("username", "username", {unique: true});

        let cities = db.createObjectStore("fav_cities", {keyPath: "_id"});
        cities.createIndex("name", "name", {unique: false});
        cities.createIndex("country", "country", {unique: false});
        cities.createIndex("userId", "userId", {unique: false});

        let hotels = db.createObjectStore("fav_hotels", {keyPath: "_id"});
        hotels.createIndex("name", "name", {unique: false});
        hotels.createIndex("city", "city", {unique: false});
        hotels.createIndex("country", "country", {unique: false});
        hotels.createIndex("userId", "userId", {unique: false});
    }

    //window.Core.model.idbRead("favoriten", function(result){console.log(result);});
    idbRead(objectStoreName, callback){
        let request = this.idb.open(dbName, dbVersion);
        request.onsuccess = function(e){
            let db = e.target.result;
            let request = db.transaction([objectStoreName], 'readonly').objectStore(objectStoreName).getAll();
            request.onsuccess = function(){
                callback(request.result);
            };
            request.onerror = function(e){
                console.error(e);
            }
        };
        request.onerror = function(e){
            console.error(e);
        };
        request.onupgradeneeded = function(e){
            Core_Model.upgradeDB(e);
        }
    }

    idbAddUser(objectStoreName, object, callback) {
        let request = this.idb.open(dbName, dbVersion);

        request.onsuccess = function(e){
            let db = e.target.result;

            let transaction = db.transaction([objectStoreName], "readwrite").objectStore(objectStoreName).add(object);

            transaction.oncomplete = function(event) {
                console.log("idbAddUser completed!" + event);
            };

            transaction.onerror = function(event) {
                console.log("idbAddUser Error!" + event);
            };
        };
        request.onerror = function(e){
            console.error(e);
        };
        request.onupgradeneeded = function(e){
            Core_Model.upgradeDB(e);
        };
    };
};