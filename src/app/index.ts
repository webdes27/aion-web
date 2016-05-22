export * from './app.component';
export * from './app.service';

import {AppState} from './app.service';
import {provide} from '@angular/core';
import {JSONP_PROVIDERS} from '@angular/http';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';


// Application wide providers
export const APP_PROVIDERS = [
	AppState,
  	JSONP_PROVIDERS,
	UserService,
	StorageService,
	provide(APP_CONFIG, {useValue: CONFIG})
];
