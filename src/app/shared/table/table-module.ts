import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgTableFilteringDirective } from './table-filtering.directive';
import { NgTableSortingDirective } from './table-sorting.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgTableFilteringDirective, NgTableSortingDirective],
  exports: [NgTableFilteringDirective, NgTableSortingDirective]
})
export class TableModule {
}