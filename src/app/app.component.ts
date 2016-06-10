import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {StatComponent} from './stat/stat.component';
//import {LoggedInRouterOutlet} from './login/directives/router_outlet';
import {MenuComponent} from './menu/menu.component';
import {AppState} from './app.service';
import { RouterActive } from './router-active';
import { ROUTES } from './router.config';

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  template: require('./app.html'),
  directives: [RouterActive, StatComponent, MenuComponent],
  styles: [
    require('./app.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})

@RouteConfig(ROUTES)

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'AION Kristall';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    //console.log('Initial App State', this.appState.state);
  }


}
