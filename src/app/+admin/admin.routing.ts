import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminComponent} from './admin.component';
import {PayBalanceComponent} from './balances/balances.component';
import {AccountComponent} from './account/account.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {PlayersComponent} from './players/players.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'account', component: AccountComponent},
  {path: 'balances', component: PayBalanceComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'players', component: PlayersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
