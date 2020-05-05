"use strict";

export default class View {
    constructor() {
        window.addEventListener("hashchanged", this.renderBreadcrumbs);
    }

    renderBreadcrumbs() {
        console.log(window.Core.breadcrumbs);
        // window.Core.t("bc_home")
        // window.Core.t("bc_hotel");
        /*window.Core.breadcrumbs.forEach(bc => {
            $("#breadcrumbs").append(`<li><a href="${bc.path}">${window.Core.t(bc.name)}</a></li>`);
        });*/
    }

}