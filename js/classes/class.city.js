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

        //TODO: do it beautiful, with .tpl and responsive
    }

    //returns Markup for Singleitem-View
    getSingleMarkup() {
        return `
            <div class="city-detail">     
                <h1>${this.name}</h1>  
                <div class="city-info">
                    <img src="${this.image}">         
                    <p><span><%>country<%></span>${this.country}</p>
                    <p><span><%>nickname<%></span>${this.nickname}</p>
                </div>
                <div id="city-hotels"></div>
            </div>            
        `;


        //TODO: do it beautiful, with .tpl and responsive
    }
}