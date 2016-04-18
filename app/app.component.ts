import {Component, provide, OpaqueToken, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {CONFIG, Config, APP_CONFIG} from './app.config';
import {IndexComponent} from './index.component';
import {PlayersComponent} from './players.component';
import {AbyssComponent} from './abyss.component';
import {LegionsComponent} from './legions.component';
import {SignupComponent} from './signup.component';
import {StatComponent} from './stat.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/app.html',
  directives: [ROUTER_DIRECTIVES, StatComponent],
  providers: [
    ROUTER_PROVIDERS, provide(APP_CONFIG, {useValue: CONFIG}),
  ]
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
  }
])
export class AppComponent {
	constructor(@Inject(APP_CONFIG) private _config: Config) {}
  	title = this._config.title;
}
