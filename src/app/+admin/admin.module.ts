import { NgModule } from '@angular/core';

import { CrudTableModule } from '../shared/crud-table';

import {AdminRoutingModule} from './admin.routing';
import {AdminComponent} from './admin.component';
import {AccountComponent} from './account/account.component';
import {PayBalanceComponent} from './balances/balances.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {PlayersComponent} from './players/players.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CrudTableModule
  ],
  exports: [],
  declarations: [
    AdminComponent,
    AccountComponent,
    PayBalanceComponent,
    ShopComponent,
    TransactionsComponent,
    PlayersComponent,
  ],
  providers: [
  ],
})
export class AdminModule { }
