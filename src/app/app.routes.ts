import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';

import {IndexComponent} from './index/index.component';
import {PlayersComponent} from './players/players.component';
import {AbyssComponent} from './abyss/abyss.component';
import {LegionsComponent} from './legions/legions.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ContactComponent} from './contact/contact.component';
import {AccountComponent} from './account/account.component';
import {CharComponent} from './char/char.component';
import {CharDetailComponent} from './char/char-detail.component';
import {ExchangeComponent} from './exchange/exchange.component';
import {PayBalanceComponent} from './balances/balances.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {HistoryComponent} from './history/history.component';
import {PassComponent} from './pass/pass.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: IndexComponent },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  {path: 'index', component: IndexComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'abyss', component: AbyssComponent},
  {path: 'legions', component: LegionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'account', component: AccountComponent},
  {path: 'char', component: CharComponent},
  {path: 'char/detail/:id', component: CharDetailComponent},
  {path: 'exchange', component: ExchangeComponent},
  {path: 'balances', component: PayBalanceComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'pass', component: PassComponent},
  { path: '**',    component: NoContent },
];
