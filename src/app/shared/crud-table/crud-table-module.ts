import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination.component';
import { ModalComponent } from './modal.component';
import { CrudTableComponent } from './crud-table.component';
import { CrudService } from './crud.service';
import { SelectComponent, SelectSearchFilter } from './select/select.component';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule
  ],
  declarations: [CrudTableComponent, PaginationComponent, ModalComponent, SelectComponent, SelectSearchFilter],
  exports: [CrudTableComponent],
  providers: [CrudService]
})
export class CrudTableModule {
}