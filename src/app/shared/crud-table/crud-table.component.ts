import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
  EventEmitter
} from '@angular/core';

import {YiiService} from './services/yii.service';
import {OrdsService} from './services/ords.service';
import {DemoService} from './services/demo.service';
import {ModalComponent} from './modal/modal.component';
import {Column, Filter, Settings, ICrudService, SortMeta, MenuItem, ITreeNode} from './types/interfaces';

@Component({
  selector: 'crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [YiiService, OrdsService, DemoService]
})

export class CrudTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('childModal')
  public readonly childModal: ModalComponent;
  @ViewChild('selectFilter') selectFilter: any;

  @Input() public columns: Column[];
  @Input() public settings: Settings;
  @Input() public treeNodes: ITreeNode[];
  @Input() public headerHeight: number = 30;
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();

  @Input() set filters(val: any) {
    this._filters = val;
    this.filterChanged.emit(this._filters);
  }
  get filters(): any {
    return this._filters;
  }
  _filters: Filter = {};

  public items: any[];
  public item: any;
  public selectedItem: any;
  public selectedRowIndex: number;
  public newItem: boolean;
  public errors: any;
  public onDetailView: boolean = false;

  public loading: boolean = false;

  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public currentPage: number = 1;

  public sortMeta: SortMeta = <SortMeta>{};
  private service: ICrudService;

  public scrollHeight: number = 380;
  public tableWidth: number = 820;
  public letterWidth: number = 10;
  public actionColumnWidth: number = 40;

  frozenColumns: Column[];
  scrollableColumns: Column[];
  frozenWidth: number = 0;
  scrollableColumnsWidth: number = 0;

  treeViewWidth: number = 150;
  rowMenu: MenuItem[];

  offsetX: number = 0;

  constructor(private yiiService: YiiService,
              private ordsService: OrdsService,
              private demoService: DemoService) {
  }

  ngOnInit() {
    this.initService();
    this.initColumns();
    this.initTableSize();
    this.initRowMenu();
    this.getItems();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  initColumns(): void {
    this.letterWidth = this.getTextWidth('M', 'bold 14px arial');
    this.setColumnsDefaults(this.columns);

    this.scrollableColumns = [];
    this.columns.forEach((column) => {
      if (column.frozen) {
        this.frozenColumns = this.frozenColumns || [];
        this.frozenColumns.push(column);
        this.frozenWidth = this.frozenWidth + column.width;
      } else {
        this.scrollableColumns.push(column);
        this.scrollableColumnsWidth = this.scrollableColumnsWidth + column.width;
      }
    });
  }

  initTableSize() {
    if (this.treeNodes) {
      this.treeViewWidth = this.settings.treeViewWidth || this.treeViewWidth;
    } else {
      this.treeViewWidth = 0;
    }
    this.tableWidth = this.settings.tableWidth || this.columnsTotalWidth(this.columns);
  }

  initService() {
    if (this.settings.type === 'yii') {
      this.service = this.yiiService;
    } else if (this.settings.type === 'ords') {
      this.service = this.ordsService;
    } else if (this.settings.type === 'demo') {
      this.service = this.demoService;
    } else {
      this.service = this.yiiService;
    }
    this.service.url = this.settings.api;
    this.service.primaryKey = (this.settings.primaryKey) ? this.settings.primaryKey.toLowerCase() : 'id';
    this.service.settings = this.settings;
  }

  initRowMenu() {
    this.rowMenu = [
      {
        label: 'View',
        icon: 'glyphicon glyphicon-eye-open',
        command: (event) => this.viewDetails(this.items[this.selectedRowIndex])
      },
      {
        label: 'Update',
        icon: 'glyphicon glyphicon-pencil',
        command: (event) => this.updateItem(this.items[this.selectedRowIndex]),
        disabled: !this.settings.crud
      }
    ];
  }

  loadingShow() {
    this.loading = true;
  }

  loadingHide() {
    this.loading = false;
  }

  getItems() {
    this.loadingShow();
    this.errors = null;
    this.service.getItems(this.currentPage, this.filters, this.sortMeta.field, this.sortMeta.order)
      .then(data => {
        this.loadingHide();
        this.items = data.items;
        this.totalItems = data._meta.totalCount;
        this.itemsPerPage = data._meta.perPage;
        this.dataChanged.emit(true);
      })
      .catch(error => {
        this.loadingHide();
        this.errors = error;
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.getItems();
  }

  save() {
    this.loadingShow();
    this.errors = null;
    if (this.newItem) {
      this.service
        .post(this.item)
        .then(res => {
          this.loadingHide();
          this.item = res;
          this.items.push(this.item);
        })
        .catch(error => {
          this.loadingHide();
          this.errors = error;
        });
    } else {
      this.service
        .put(this.item)
        .then(res => {
          this.loadingHide();
          this.items[this.findSelectedItemIndex()] = res;
        })
        .catch(error => {
          this.loadingHide();
          this.errors = error;
        });
    }
    this.childModal.hide();
  }

  delete() {
    this.loadingShow();
    this.errors = null;
    this.service
      .delete(this.item)
      .then(res => {
        this.loadingHide();
        this.items.splice(this.findSelectedItemIndex(), 1);
        this.item = null;
        this.onDetailView = false;
      })
      .catch(error => {
        this.loadingHide();
        this.errors = error;
      });
    this.childModal.hide();
  }

  cloneItem(item: any) {
    const clone = Object.assign({}, item);
    this.selectedItem = Object.assign({}, item);
    return clone;
  }

  findSelectedItemIndex(): number {
    const obj = this.items.find(x => JSON.stringify(x) === JSON.stringify(this.selectedItem));
    const index = this.items.indexOf(obj);
    return index;
  }

  createItem() {
    this.newItem = true;
    this.item = {};
    this.childModal.show();
  }

  updateItem(item: any) {
    this.newItem = false;
    this.item = this.cloneItem(item);
    this.childModal.show();
  }

  editItem(item: any) {
    this.newItem = false;
    this.item = this.cloneItem(item);
    this.save();
  }

  viewDetails(item: any) {
    this.errors = null;
    this.item = this.cloneItem(item);
    this.onDetailView = true;
  }

  closeDetails() {
    this.onDetailView = false;
  }

  onFilter(event) {
    this.filters = event;
    this.getItems();
  }

  sort(event) {
    this.sortMeta = event.sortMeta;
    this.getItems();
  }

  modalTitle() {
    return (this.newItem) ? 'Create' : 'Update';
  }

  showColumnMenu(event) {
    this.selectFilter.show(200, event.top, event.left, event.column);
  }

  setColumnDefaults(column: Column): Column {
    if (!column.hasOwnProperty('sortable')) {
      column.sortable = true;
    }
    if (!column.hasOwnProperty('filter')) {
      column.filter = true;
    }
    if (!column.hasOwnProperty('width')) {
      column.width = (column.name.length * this.letterWidth) + 50;
      if (column.width < 150) {
        column.width = 150;
      }
    }
    if (!column.hasOwnProperty('frozen')) {
      column.frozen = false;
    }
    if (!column.hasOwnProperty('type')) {
      column.type = 'text';
    }
    if (!column.hasOwnProperty('resizeable')) {
      column.resizeable = true;
    }
    return column;
  }

  setColumnsDefaults(columns: Column[]): Column[] {
    if (!columns) {
      return;
    }
    const result = columns.map(this.setColumnDefaults, this);
    return result;
  }

  columnsTotalWidth(columns: Column[]): number {
    let totalWidth = 0;
    for (const column of columns) {
      totalWidth = totalWidth + column.width;
    }
    return totalWidth + this.actionColumnWidth;
  }

  getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  resizeColumn({column, newValue}: any) {
    for (const col of this.columns) {
      if (col.name === column.name) {
        col.width = newValue;
      }
    }
  }

  onBodyScroll(event: MouseEvent): void {
    this.offsetX = event.offsetX;
    this.selectFilter.hide();
  }

  setColumnSelectedOption(value, field, matchMode) {
    this.selectFilter.setColumnSelectedOption(value, field, null);
  }

}
