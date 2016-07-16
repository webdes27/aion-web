export * from './app.component';
export * from './app.service';
export * from './app.routes';

import {AppState} from './app.service';
import {provide} from '@angular/core';
import {JSONP_PROVIDERS} from '@angular/http';
import {UserService} from './services/user/user.service';
import {StorageService} from './services/storage/storage.service';
import {RequestService} from './services/request/request.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';
import {LoadingService} from './services/loading';


// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  JSONP_PROVIDERS,
  UserService,
  StorageService,
  RequestService,
  provide(APP_CONFIG, {useValue: CONFIG}),
  LoadingService
];
