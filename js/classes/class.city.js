"use strict";

export default class City {
    constructor(city) {
        Object.assign(this, city);
    }

    //returns Markup for Listview of City
    getListMarkup() {
        return `
            <a class="city" href="#/city?id=${this["_id"]}">
                <p><span>Name:</span>${this.name}</p>
                <p><span>Country:</span>${this.country}</p>
                <p><span>Nickname:</span>${this.nickname}</p>
                <img src="${this.image}">
            </a>
        `;

        //TODO: do it beautiful, with .tpl and responsive
    }

    //returns Markup for Singleitem-View
    getSingleMarkup() {
        return `
            <div>
                <img src="${this.image}">
                <p><span>Name:</span>${this.name}</p>
                <p><span>Country:</span>${this.country}</p>
                <p><span>Nickname:</span>${this.nickname}</p>              
            </div>
        `;

        //TODO: do it beautiful, with .tpl and responsive
    }
}