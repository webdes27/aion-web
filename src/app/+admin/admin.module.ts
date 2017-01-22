import { NgModule } from '@angular/core';

import { CrudTableModule } from '../shared/crud-table';

import {AdminRoutingModule} from './admin.routing';
import {AdminComponent}   from './admin.component';
import {AccountComponent} from './account/account.component';
import {PayBalanceComponent} from './balances/balances.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';

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
  ],
  providers: [
  ],
})
export class AdminModule { }
