import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';

if (window['IS_PROD'] === 'true') {
  enableProdMode();
}

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	UserService,
	StorageService,
	provide(APP_CONFIG, {useValue: CONFIG}),
]);