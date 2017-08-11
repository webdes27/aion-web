import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import {IndexComponent} from './index/index.component';
import {PlayersComponent} from './players/players.component';
import {AbyssComponent} from './abyss/abyss.component';
import {LegionsComponent} from './legions/legions.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ContactComponent} from './contact/contact.component';
import {CharComponent} from './char/char.component';
import {CharDetailComponent} from './char/char-detail.component';
import {ExchangeComponent} from './exchange/exchange.component';
import {HistoryComponent} from './history/history.component';
import {PassComponent} from './pass/pass.component';
import {BonusComponent} from './bonus/bonus.component';
import {PayComponent} from './pay/pay.component';
import {DemoComponent} from './demo/demo.component';

export const ROUTES: Routes = [
  {path: '',      component: IndexComponent},
  {path: 'index', component: IndexComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'abyss', component: AbyssComponent},
  {path: 'legions', component: LegionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'char', component: CharComponent},
  {path: 'char/detail/:id', component: CharDetailComponent},
  {path: 'exchange', component: ExchangeComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'pass', component: PassComponent},
  {path: 'bonus', component: BonusComponent},
  {path: 'pay', component: PayComponent},
  {path: 'admin', loadChildren: './+admin/admin.module#AdminModule'},
  {path: 'demo', component: DemoComponent},

  { path: '**',    component: NoContentComponent },
];
