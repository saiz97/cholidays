"use strict";

export default class Hotel {
    constructor(hotel) {
        Object.assign(this, hotel);
    }

    //returns Markup for Listview of Hotel
    async getListMarkup() {
        let markup = `
            <a class="hotel-card" href="#/hotel?id=${this["_id"]}" data-id="${this["_id"]}">
                <div class="card-header" style="background-image: url('${this.images[0]}')">  
                    <button type="button" class="${await this.isFavoriteHotel(this["_id"])}"><i class="fas fa-heart"></i></button>
                </div>
                <div class="card-body">
                    <h1>${this.name}</h1>
                    <h4>${this.getStarRating(this.stars)} | ${this.price}€ per Night</h4>
                </div>
            </a> 
        `;

        return markup;
    }

    isFavoriteHotel(hotel_id) {
        return new Promise(resolve => {
            let key = window.localStorage.getItem("username") + "&" + hotel_id;
            window.Core.model.idbReadByKey("fav_hotels", key, function (result) {
                resolve((result === undefined) ? "favorite-hotel" : "favorite-hotel isFavors")
            });
        });
    }

    //returns Markup for Singleitem-View
    async getSingleMarkup() {
        let markup = `
            <div id="breadcrumbs">
                ${window.Core.checkFirstBreadcrumb()}<span> > </span>
                <a href="" class="bc-cityofhotel">${this.city}</a><span> > </span>
                <a>${this.name}</a>
            </div>
            <div class="hotel-information">
                <div class="hotel-desc">
                    <h1>${this.name}</h1>
                    <h4>${this.getStarRating(this.stars)} | ${this.price}€ per Night</h4>
                    <p>${this.description}</p>  
                </div>
                ${await this.getContactInformation(this)}
            </div>
            
        `;

        markup += this.getAmenities(this.amenities);
        markup += this.getSlideshow(this.images);

        this.getGoogleMap(this.latitude, this.longitude);
        return markup;
    }

    getAmenities(amenities) {
        let result = `<div class="amenities-container"><h2>${window.Core.t("amenities")}</h2><ul class="hotel-amenities">`;

        if (amenities.wifi) result += '<li><i class="fas fa-wifi tooltip"><span class="tooltiptext">Free Wifi</span></i></li>';
        if (amenities.pool) result += '<li><i class="fas fa-swimmer tooltip"><span class="tooltiptext">Swimming Pool</span></i></li>';
        if (amenities.spa) result += '<li><i class="fas fa-spa tooltip"><span class="tooltiptext">Spa Area</span></i></li>';
        if (amenities.parking) result += '<li><i class="fas fa-parking tooltip"><span class="tooltiptext">Free Parking</span></i></li>';
        if (amenities.ac) result += '<li><i class="fas fa-fan tooltip"><span class="tooltiptext">Air Condition</span></i></li>';
        if (amenities.restaurant) result += '<li><i class="fas fa-utensils tooltip"><span class="tooltiptext">Restaurant</span></i></li>';
        if (amenities.bar) result += '<li><i class="fas fa-glass-cheers tooltip"><span class="tooltiptext">Bar Area</span></i></li>';
        if (amenities.gym) result += '<li><i class="fas fa-dumbbell tooltip"><span class="tooltiptext">Gym Area</span></i></li>';

        result += '</ul></div>';
        return result;
    }

    getGoogleMap(latitude, longitude) {
        let mymap = L.map('mapid').setView([latitude, longitude], 300);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(mymap);

        L.marker(L.latLng(latitude, longitude)).addTo(mymap);
    }

    getSlideshow(images) {
        let slideshow = '<div class="slider-container"><div>';
        for (const image of images) {
            slideshow += `
                <div class="image-slide">
                  <img src="${image}">                
                </div>`
        }
        slideshow += `  <button class="slide-display-left">&#10094;</button>
                        <button class="slide-display-right">&#10095;</button>
                    </div></div>`;
        return slideshow;
    }

    async getContactInformation(hotel) {
        let result = `<div class="hotel-contact" data-id="${hotel._id}"><table>`;

        if(hotel.address !== "") result += `<tr><td><i class="fas fa-map-marker-alt"></i></td><td>${hotel.address}</td></tr>`;
        if(hotel.email !== "") result += `<tr><td><i class="fas fa-envelope"></i></td><td><a href="mailto:${hotel.email}">${hotel.email}</a></td></tr>`;
        if(hotel.phone !== "") result += `<tr><td><i class="fas fa-phone"></i></td><td><a href="tel:${hotel.phone}">${hotel.phone}</a></td></tr>`;
        if(hotel.website !== "") result += `<tr><td><i class="fas fa-globe"></i></td><td><a href="${hotel.website}">${hotel.website.replace(/^https?\:\/\//i, "")}</a></td></tr>`;


        result += '</table>';
        result += `
             <div class="${await this.isFavoriteHotel(hotel._id)}">
                <i class="fas fa-heart"></i> ${window.Core.t("like")}
            </div>
            </div>`;

        return result;
    }

    getStarRating(stars) {
        let rating = "";
        for (let i = 0; i < stars; i++) {
            rating += '<i class="fas fa-star"></i>';
        }
        return rating;
    }
}