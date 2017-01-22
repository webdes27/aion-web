import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ng2-bootstrap/pagination';
import { ModalModule } from 'ng2-bootstrap/modal';

import { CrudTableComponent } from './crud-table.component';
import { CrudService } from './crud.service';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [CrudTableComponent],
  exports: [CrudTableComponent],
  providers: [CrudService]
})
export class CrudTableModule {
}