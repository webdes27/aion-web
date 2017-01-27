import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap/modal';

import { PaginationComponent } from './pagination.component';

import { CrudTableComponent } from './crud-table.component';
import { CrudService } from './crud.service';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [CrudTableComponent, PaginationComponent],
  exports: [CrudTableComponent],
  providers: [CrudService]
})
export class CrudTableModule {
}