import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

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

export const ROUTES: Routes = [
  { path: '',      component: IndexComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  //{ path: 'detail', loadChildren: './+detail#DetailModule'},
  //{ path: 'barrel', loadChildren: './+barrel#BarrelModule'},
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

  { path: '**',    component: NoContentComponent },
];
