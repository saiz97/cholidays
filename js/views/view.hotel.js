"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class HotelView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        if (window.Core.utils.isEmpty(window.Core.getParams["id"])
            || window.Core.model.getHotel(window.Core.getParams["id"]) === false) {
            window.location.hash = "/"; //lead back to homepage
        } else {
            let self = this;
            window.Core.model.getHotel(window.Core.getParams["id"]).then(async function (response) {
                self.hotel = response;
                self.render();
            });
        }
    }

    render() {
        $("#hotels_detail_container").html(this.hotel.getSingleMarkup());
    }
};