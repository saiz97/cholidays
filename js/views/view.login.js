"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class LoginView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        //console.log("Hi @ loginview");

        $("#login-submit").unbind("click").on("click", function (e) {
            e.preventDefault();
            $("#login").hide();
            $("#logout").show();
            window.location.hash = "/";
        });
        //HERE COMES VIEW SPECIFIC STUFF
    }
}