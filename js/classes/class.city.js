"use strict";

export default class City {
    constructor(city) {
        Object.assign(this, city);
        this.hotels = [];
    }

    //returns Markup for Listview of City
    getListMarkup() {
        return `
            <a class="city" href="#/city?id=${this["_id"]}" style="background-image: 
            linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(103, 126, 54, 0.3)),
            url('${this.image}')">
                <h1>${this.name}</h1>
                <h4>${this.country}</h4>
                <p>${this.nickname}</p>
            </a>
        `;
    }

    //returns Markup for Singleitem-View
    getSingleMarkup() {
        return `
            <div class="city-banner" style="background-image: url('${this.image}')">
                <h1>${this.name}</h1> 
            </div>
            <div class="city-detail">
                <div class="city-info">
                    <p><span><%>country<%></span>${this.country}</p>
                    <p><span><%>nickname<%></span>${this.nickname}</p> 
                </div>
                    
                <div id="mapid"></div>               
            </div>
            <h1 class="headline-hotels">Visit our Hotels</h1>
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