"use strict";
/***************************************************
 *  A Collectorclass for several useful functions.
 *  Contains functions that are general and usable
 *  in different apps.
 *
 *  Neuwersch, 2020-03-15
 ***************************************************/
export default class Core_Utils{
    constructor(){ }

    setCookie(name, value, days) {
        let date = new Date;
        date.setTime(date.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + date.toUTCString();
    }

    getCookie(name) {
        let cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return cookie ? cookie[2] : null;
    }

    deleteCookie(name) {
        Core_Utils.setCookie(name, '', -1);
    }

    isEmpty(variable) {
        if (Array.isArray(variable)) {
            return variable.length === 0;
        } else if (typeof variable === "object") {
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        } else {
            return (typeof variable === "undefined" || variable == null || variable === "");
        }
    }
}