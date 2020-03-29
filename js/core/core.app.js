"use strict";
import Core_SPA_Router from "./core.spa-router.js?v=0.1";

/**********************************************************************
 *     Class-Bundle for Web-Apps.
 *     App-Shell needs an ID "#core_app".
 *
 *     @param:
 *     webRoot - Give me the root-URL of your App
 *     templatesPath - Give me the Path to your templates
 *       relative to your webRoot.
 *     routes - Give me an Object with "slug" : "template" Routes
 *     ...languages - Give me all languages you want your App to support.
 *
 *     Neuwersch - 2020-03-25
 **********************************************************************/

export default class Core_App{
    constructor(webRoot, templatesPath, routes, ...languages){
        window.Core = this; //attach core to current window object
        this.system = {
            webRoot: webRoot, //Root-URL of the App
            templatesPath: templatesPath, //path to folder container our templates
            debugmode: true //if actived, show debug logs in console
        };

        this.router = new Core_SPA_Router(routes);
    }
}