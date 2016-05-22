import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {IndexComponent} from './index/index.component';
import {PlayersComponent} from './players/players.component';
import {AbyssComponent} from './abyss/abyss.component';
import {LegionsComponent} from './legions/legions.component';
import {SignupComponent} from './signup/signup.component';
import {StatComponent} from './stat/stat.component';
import {LoginComponent} from './login/login.component';
import {ContactComponent} from './contact/contact.component';
//import {LoggedInRouterOutlet} from './directives/router_outlet';
import {MenuComponent} from './menu/menu.component';
import {AppState} from './app.service';
import { RouterActive } from './router-active';
import { Home } from './home';

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
@RouteConfig([
  {
    path: '/index',
    name: 'Index',
    component: IndexComponent,
    useAsDefault: true
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupComponent
  },
  {
    path: '/players',
    name: 'Players',
    component: PlayersComponent
  },
  {
    path: '/abyss',
    name: 'Abyss',
    component: AbyssComponent
  },
  {
    path: '/legions',
    name: 'Legions',
    component: LegionsComponent
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactComponent
  },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
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
