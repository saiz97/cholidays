"use strict";

export default class Hotel {
    constructor(hotel) {
        Object.assign(this, hotel);
    }

    //returns Markup for Listview of Hotel
    getListMarkup() {


        let markup = `
            <a class="hotel-card" href="#/hotel?id=${this["_id"]}">
                <img src="${this.images[0]}">
                <h1>${this.name}</h1>
                <h6>${this.price}</h6>
                <h6>${this.getStarRating(this.stars)}</h6>
            </a> 
        `;

        return markup;

        //TODO: do it beautiful, with .tpl and responsive
    }

    //returns Markup for Singleitem-View
    getSingleMarkup() {
        let markup = `
            <div class="hotel-information">
                <div class="hotel-desc">
                    <h1>${this.name}</h1>
                    <h4>${this.getStarRating(this.stars)} | ${this.price}€ per Night</h4>
                    <p>${this.description}</p>  
                </div>
                ${this.getContactInformation(this)}
            </div>
            
        `;

        markup += this.getSlideshow(this.images);
        markup += this.getAmenities(this.amenities);

        //this.getGoogleMap(this.latitude, this.longitude);
        return markup;
        //TODO: do it beautiful, with .tpl and responsive
    }

    getAmenities(amenities) {
        let result = '<h2><%>Amenities<%></h2><ul class="hotel-amenities">';

        if (amenities.wifi) result += '<li><i class="fas fa-wifi"></i></li>';
        if (amenities.pool) result += '<li><i class="fas fa-swimmer"></i></li>';
        if (amenities.spa) result += '<li><i class="fas fa-spa"></i></li>';
        if (amenities.parking) result += '<li><i class="fas fa-parking"></i></li>';
        if (amenities.ac) result += '<li><i class="fas fa-fan"></i></li>';
        if (amenities.restaurant) result += '<li><i class="fas fa-utensils"></i></li>';
        if (amenities.bar) result += '<li><i class="fas fa-glass-cheers"></i></li>';
        if (amenities.gym) result += '<li><i class="fas fa-dumbbell"></i></li>';

        result += '</ul>';
        return result;
    }

    getGoogleMap(latitude, longitude) {

    }

    getSlideshow(images) {
        let slideshow = '<div class="slider-content slider-container">';
        for (const image of images) {
            slideshow += `
                <div class="slider-container slide">
                  <img src="${image}" style="width:100%">                
                </div>`
        }
        slideshow += '</div>';
        return slideshow;
    }

    getContactInformation(hotel) {
        let result = '<div class="hotel-contact"><table>';

        if(hotel.address !== "") result += `<tr><td><i class="fas fa-map-marker-alt"></i></td><td>${hotel.address}</td></tr>`;
        if(hotel.email !== "") result += `<tr><td><i class="fas fa-envelope"></i></td><td><a href="mailto:${hotel.email}">${hotel.email}</a></td></tr>`;
        if(hotel.phone !== "") result += `<tr><td><i class="fas fa-phone"></i></td><td><a href="tel:${hotel.phone}">${hotel.phone}</a></td></tr>`;
        if(hotel.website !== "") result += `<tr><td><i class="fas fa-globe"></i></td><td><a href="${hotel.website}">${hotel.website.replace(/^https?\:\/\//i, "")}</a></td></tr>`;

        result += '</table></div>';
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