"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class CityView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
        this.city = undefined;
    }

    init() {
        super.init();

        if (window.Core.utils.isEmpty(window.Core.getParams["id"])
            || window.Core.model.getCity(window.Core.getParams["id"]) === false) {
            window.location.hash = "/"; //lead back to homepage
        } else {
            let self = this;
            console.log(window.Core.getParams["id"]);
            window.Core.model.getCity(window.Core.getParams["id"]).then(function (response) {
                self.city = response;
                self.render();
            });
        }
    }

    render() {
        $("#cities_detail_container").html(this.city.getSingleMarkup());
        console.log($(".city-hotels"));
    }
}