import {Component, Inject} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {Config, APP_CONFIG} from './app.config';
import {IndexComponent} from './index.component';
import {PlayersComponent} from './players.component';
import {AbyssComponent} from './abyss.component';
import {LegionsComponent} from './legions.component';
import {SignupComponent} from './signup.component';
import {StatComponent} from './stat.component';
import {LoginComponent} from './login.component';
import {LoggedInRouterOutlet} from './directives/router_outlet';
import {MenuComponent} from './menu.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/app.html',
  directives: [StatComponent, LoggedInRouterOutlet, MenuComponent],
  providers: []
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
  }
])
export class AppComponent {
	constructor(@Inject(APP_CONFIG) private _config: Config) {}

  	title = this._config.title;

}
