import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
// import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
platformBrowserDynamic().bootstrapModule(AppModule);
