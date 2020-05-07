"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class FavoriteView extends Core_View {
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        this.renderFavoriteCities();
        this.initAccordion();
    }

    initAccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }


    async renderFavoriteCities() {
        return await new Promise(resolve => {
            window.Core.model.idbReadAll("fav_cities", function (callback) {
                let user = window.localStorage.getItem("username");
                let res = [];
                callback.forEach(c => {
                    if (c.username === user) res.push(c);
                });
                resolve(res);
            });
        }).then((cities) => {
            let html = ``;
            cities.forEach((c) => {
                new Promise(resolve => {
                    resolve(window.Core.model.getCity(c.city_id));
                }).then(city => {
                    console.log(city);
                    html += `
                        <div class="accordion">
                            <h1>${city.name}</h1>
                            <h3>${city.country}</h3>
                        </div>
                        <div class="acc-city panel">
                            
                        </div>
                        `;
                    $("#favorites-container").append(html);
                });
            });

        });
    }

    renderFavoriteHotels() {
        let html = ``;
    }
}