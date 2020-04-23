"use strict";

export default class Hotel {
    constructor(hotel) {
        Object.assign(this, hotel);
    }

    //returns Markup for Listview of Hotel
    getListMarkup() {
        let rating = "";
        for (let i = 0; i < this.stars; i++) {
            rating += "⭐";
        }

        let markup = `
            <div class="hotel-card">
                <img src="${this.images[0]}">
                <h1>${this.name}</h1>
                <h6>${this.price}</h6>
                <h6>${rating}</h6>
            </div> 
        `;

        console.log(markup);
        return markup;

        //TODO: do it beautiful, with .tpl and responsive
    }

    //returns Markup for Singleitem-View
    getSingleMarkup() {
        return `
                    
        `;

        //TODO: do it beautiful, with .tpl and responsive
    }
}