"use strict";

import Core_App from "./core/core.app.js?v=0.1";
import LoginView from "./views/view.login.js?v=0.1";
import HomepageView from "./views/view.homepage.js?v=0.1";

//first route = homepage
let routes = [
    new HomepageView("/", "homepage"),
    new LoginView("/login", "login")
];

const C_HOLIDAYS_APP = new Core_App("http://localhost/FH/JS/CHolidays/", "templates", routes, "de", "en");