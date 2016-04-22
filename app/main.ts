import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {UserService} from './user.service';
import {StorageService} from './storage.service';

if (window['IS_PROD'] === 'true') {
  enableProdMode();
}

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	UserService,
	StorageService,
]);