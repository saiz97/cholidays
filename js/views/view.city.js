"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class CityView extends Core_View{
    constructor(slug, template) {
        super(slug, template);

        //window.Core.breadcrumbs.push({name:"bc_city", path:slug});
        this.breadcrumb = {name:"bc_city", path:slug};
    }

    init() {
        super.init();
        if (window.Core.utils.isEmpty(window.Core.getParams["id"])
            || window.Core.model.getCity(window.Core.getParams["id"]) === false) {
            window.location.hash = "/"; //lead back to homepage
        } else {
            let self = this;
            window.Core.model.getCity(window.Core.getParams["id"]).then(async function (response) {
                self.city = response;
                self.city.hotels = await window.Core.model.getHotelsOfCity(self.city.name);
                await self.render();
                self.setBreadcrumb(self.breadcrumb, `${self.breadcrumb.path}?id=${window.Core.getParams["id"]}`);
            });
            console.log("Citydetail successfully rendered");
        }
    }

    setBreadcrumb(breadcrumb, path) {
        super.setBreadcrumb(breadcrumb, path);
    }

    async render() {
        await this.city.loadCityMap();
        $("#cities_detail_container").html(this.city.getSingleMarkup());
        $("#city-hotels").empty();

        for (const hotel of this.city.hotels) {
            $("#city-hotels").append(hotel.getListMarkup());
        }
    }
}