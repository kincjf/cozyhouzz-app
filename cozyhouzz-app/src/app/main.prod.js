"use strict";
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var app_module_1 = require('./app.module');
// import { AppModuleNgFactory } from './app.module.ngfactory';
core_1.enableProdMode();
platform_browser_1.platformBrowser().bootstrapModule(app_module_1.AppModule);
