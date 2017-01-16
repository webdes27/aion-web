import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminComponent} from './admin.component';
import {PayBalanceComponent} from './balances/balances.component';
import {AccountComponent} from './account/account.component';
import {AccountDetailComponent} from './account/account-detail.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account/:id/detail', component: AccountDetailComponent},
  {path: 'balances', component: PayBalanceComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'transactions', component: TransactionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }