"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class HotelView extends Core_View{
    constructor(slug, template) {
        super(slug, template);

        //window.Core.breadcrumbs.push({name:"bc_hotel", path:slug});
        this.breadcrumb = {name:"bc_hotel", path:slug};
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
                self.breadcrumb.path = `${self.breadcrumb.path}?id=${window.Core.getParams["id"]}`;
                window.Core.breadcrumbs.push(self.breadcrumb);
            });
        }

    }

    render() {
        $("#hotels_detail_container").html(this.hotel.getSingleMarkup());
        this.initSlider();
    }

    initSlider() {
        let slideIndex = 1;
        showDivs(slideIndex);

        $('.slide-display-left').on('click', (e) => {
            showDivs(slideIndex += -1);
        });

        $('.slide-display-right').on('click', (e) => {
            showDivs(slideIndex += 1);
        });

        function showDivs(n) {
            let x = $('.image-slide');
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length}
            for (let i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex-1].style.display = "block";
        }
    }
};