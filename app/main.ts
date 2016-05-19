import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {enableProdMode, provide} from '@angular/core';
import {JSONP_PROVIDERS, HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {FORM_PROVIDERS, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';

if (window['IS_PROD'] === 'true') {
  enableProdMode();
}

bootstrap(AppComponent, [
  JSONP_PROVIDERS,
	FORM_PROVIDERS,
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	UserService,
	StorageService,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	provide(APP_CONFIG, {useValue: CONFIG}),
]);
