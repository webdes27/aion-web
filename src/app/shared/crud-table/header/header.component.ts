import {Component, OnInit, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import {Column, Filter, SortMeta, Settings} from '../types/interfaces';

@Component({
  selector: 'datatable-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  host: {
    class: 'datatable-header'
  }
})

export class HeaderComponent implements OnInit {

  @Input() public columns: Column[];
  @Input() public filters: Filter = {};
  @Input() public sortMeta: SortMeta;
  @Input() public actionColumnWidth: number;
  @Input() offsetX: number;
  @Input() public settings: Settings;

  @Output() onSort: EventEmitter<any> = new EventEmitter();
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  @Output() onShowColumnMenu: EventEmitter<any> = new EventEmitter();
  @Output() onClearAllFilters: EventEmitter<any> = new EventEmitter();
  @Output() onResize: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.height.px')
  @Input() headerHeight: number;

  public minWidthColumn: number = 50;
  public maxWidthColumn: number = 500;
  frozenColumns: Column[] = [];
  scrollableColumns: Column[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.columns) {
      /* action column */
      this.frozenColumns.push(<Column>{
        title: '',
        name: '',
        sortable: false,
        filter: false,
        width: this.actionColumnWidth
      });

      this.columns.forEach((column) => {
        if (column.frozen) {
          this.frozenColumns.push(column);
        } else {
          this.scrollableColumns.push(column);
        }
      });
    }
  }

  sort(event, column: Column) {
    if (!column.sortable) {
      return;
    }
    this.sortMeta.order = (this.sortMeta.field === column.name) ? this.sortMeta.order * -1 : 1;
    this.sortMeta.field = column.name;
    this.onSort.emit({
      sortMeta: this.sortMeta
    });
  }

  getSortOrder(column: Column) {
    let order = 0;
    if (this.sortMeta.field && this.sortMeta.field === column.name) {
      order = this.sortMeta.order;
    }
    return order;
  }

  isFilter(column: Column): boolean {
    let length = 0;
    if (this.filters[column.name] && this.filters[column.name].value) {
      length = this.filters[column.name].value.trim().length;
    }
    return length > 0 ? true : false;
  }

  filter(event) {
    this.filters = event;
    this.onFilter.emit(this.filters);
  }

  clearAllFilters() {
    this.filters = {};
    this.onClearAllFilters.emit(true);
  }

  hasFilter() {
    let empty = true;
    for (const prop in this.filters) {
      if (this.filters.hasOwnProperty(prop)) {
        empty = false;
        break;
      }
    }
    return !empty;
  }

  showColumnMenu(event, column: Column) {
    const el = event.target.parentNode;
    let left = el.offsetLeft;
    let top = el.offsetTop;
    const rowHeight = this.getHeight(el.parentNode);
    top = top + rowHeight;
    // datatable-row-left + offsetLeft
    left = left + el.parentNode.offsetLeft;

    const doc = el.parentNode.parentNode.parentNode.parentNode;
    const windowScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    left = left - windowScrollLeft;

    this.onShowColumnMenu.emit({'top': top, 'left': left, 'column': column});
  }

  getHeight(el): number {
    let height = el.offsetHeight;
    const style = getComputedStyle(el);
    height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    return height;
  }

  onColumnResized(width: number, column: Column): void {

    if (width <= this.minWidthColumn) {
      width = this.minWidthColumn;
    } else if (width >= this.maxWidthColumn) {
      width = this.maxWidthColumn;
    }

    this.onResize.emit({
      column: column,
      newValue: width
    });
  }

  stylesByGroup() {
    const styles: any = {};
    styles.left = `${this.offsetX * -1}px`;
    return styles;
  }

}
