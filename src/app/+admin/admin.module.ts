import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import {
  DataTableModule,
  DialogModule
} from 'primeng/primeng';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { ModalModule } from 'ng2-bootstrap/modal';

import { NgTableFilteringDirective } from '../shared/directives/table-filtering.directive';
import { NgTableSortingDirective } from '../shared/directives/table-sorting.directive';

import {AdminRoutingModule} from './admin.routing';
import {AdminComponent}   from './admin.component';
import {AccountComponent} from './account/account.component';
import {AccountDetailComponent} from './account/account-detail.component';
import {PayBalanceComponent} from './balances/balances.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    AdminRoutingModule,
    DataTableModule,
    DialogModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [],
  declarations: [
    AdminComponent,
    AccountComponent,
    AccountDetailComponent,
    PayBalanceComponent,
    ShopComponent,
    TransactionsComponent,
    NgTableFilteringDirective,
    NgTableSortingDirective
  ],
  providers: [
  ],
})
export class AdminModule { }
