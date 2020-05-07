"use strict";

export default class City {
    constructor(city) {
        Object.assign(this, city);
        this.hotels = [];
    }

    //returns Markup for Listview of City
    async getListMarkup() {
        return `
                <a class="city" href="#/city?id=${this["_id"]}" data-id="${this["_id"]}" 
                style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(103, 126, 54, 0.3)),
                url('${this.image}')">
                    <button type="button" class="${await this.isFavoriteCity(this["_id"])}"><i class="fas fa-heart"></i></button>
                    <h1>${this.name}</h1>
                    <h4>${this.country}</h4>
                    <p>${this.nickname}</p>
                </a>
            `;
    }

    isFavoriteCity(city_id) {
        return new Promise(resolve => {
            let key = window.localStorage.getItem("username") + "&" + city_id;
            window.Core.model.idbReadByKey("fav_cities", key, function (result) {
                resolve((result === undefined) ? "favorite-city" : "favorite-city isFavors")
            });
        });
    }

    //returns Markup for Singleitem-View
    async getSingleMarkup() {
        return `          
            <div class="city-banner" style="background-image: url('${this.image}')" data-id="${this["_id"]}">
                <h1>${this.name}</h1>
                <button type="button" class="${await this.isFavoriteCity(this["_id"])}"><i class="fas fa-heart"></i></button> 
            </div>
            <div class="city-detail">
                <div>
                    <div id="breadcrumbs">
                        <a href="#" class="homelink">Home</a><span> > </span>
                        <a>${this.name}</a>
                    </div>
                    <div class="city-info">
                        <p><span>${window.Core.t("country")}</span>${this.country}</p>
                        <p><span>${window.Core.t("nickname")}</span>${this.nickname}</p> 
                    </div>
                </div>               
                    
                <div id="mapid"></div>               
            </div>
            <h1 class="headline-hotels">${window.Core.t("visithotelsheader")}</h1>
            <div id="city-hotels"></div>`;
    }

    loadCityMap() {
        $.get({
            url: `https://geocode.xyz/${this.name.replace(/\s+/g, '%20')}?geoit=csv`,
            async: true
        }, (data) => {
            let lat = data.split(",")[2];
            let lng = data.split(",")[3];

            let mymap = L.map('mapid').setView([lat, lng], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(mymap);

            L.marker(L.latLng(lat, lng)).addTo(mymap);
        });
    }

}