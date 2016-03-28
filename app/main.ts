import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {enableProdMode} from 'angular2/core';

if (window['IS_PROD'] === 'true') {
  enableProdMode();
}

bootstrap(AppComponent);