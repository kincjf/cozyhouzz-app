"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
// import { AppModuleNgFactory } from './app.module.ngfactory';
core_1.enableProdMode();
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);