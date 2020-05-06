"use strict";
import Core_View from "../core/core.spa-view.js?v=0.1";

export default class LoginView extends Core_View{
    constructor(slug, template) {
        super(slug, template);
    }

    init() {
        super.init();
        let self = this;
        $("#login-submit").unbind("click").on("click", function (e) {
            e.preventDefault();
            self.doLoginChecks();
        });
    }

    doLoginChecks() {
        let username = $('#login-username').val();
        if ($('#login-password').val() !== ""
            || username !== "") {

            window.Core.model.idbRead("user", function (result) {
                let existing = false;
                result.forEach(u => {
                    if (u.name === username) existing = true;
                });

                if (!existing) {
                    window.Core.model.idbAddUser("user", {
                        _id: result.length + 1,
                        name: username
                    }, function (response) {
                        console.log(response);
                    });
                }

                window.localStorage.setItem('username', username);
                $("#currUser").text(username);
                $("#loggedInAs").show();
                $("#login").hide();
                $("#logout").show();
                window.location.hash = "/";
            });
        } else {
            alert("Nope :) Another try!");
        }
    }
}