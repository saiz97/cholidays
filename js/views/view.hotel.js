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
                await self.render();
                console.log("finished rendering hotel details");

                $(".bc-cityofhotel").unbind("click").on("click", function (e) {
                    e.preventDefault();
                    window.Core.model.getCityBy("name", $(e.currentTarget).text()).then(function (res) {
                        window.location.hash = "#/city?id=" + res['_id'];
                    });
                });
            });
        }
    }

    toggleSnackbarMessage() {
        super.toggleSnackbarMessage();
    }

    async render() {
        $("#hotels_detail_container").html(await this.hotel.getSingleMarkup());
        this.initSlider();

        let self = this;
        $(".favorite-hotel").unbind("click").on("click", function (e) {
            e.preventDefault();
            let h_id = $($(this).parent()).data("id");

            window.Core.model.getHotel(h_id).then(async (res) => {
                if((await window.Core.model.changeHotelFavStatusInIdb(res)) === false)
                    self.toggleSnackbarMessage();
            });

            $(this).toggleClass("isFavors");
        });
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