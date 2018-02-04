import {Component, Input, Output, ViewChild, ViewContainerRef, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {ICrudService} from '../types';
import {DataTable} from '../models/data-table';
import {Column} from '../models/column';

@Component({
  selector: 'app-row-form',
  templateUrl: 'form.component.html'
})

export class FormComponent implements OnInit, OnDestroy {

  @Input() public table: DataTable;
  @Input() public item: any;
  @Input() public isNew: boolean = true;
  @Input() public service: ICrudService;
  @Output() valid: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('cellTemplate', {read: ViewContainerRef}) cellTemplate: ViewContainerRef;
  private validElements: any = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }

  elemEnabled(column: Column): boolean {
    if (column.formHidden) {
      return false;
    }
    const name = column.name;
    if (this.table.settings.primaryKeys && this.table.settings.primaryKeys.length && !this.isNew) {
      return (this.table.settings.primaryKeys.indexOf(name) === -1);
    } else {
      return true;
    }
  }

  onValid(event: any, column: Column) {
    this.validElements[column.name] = event;
    this.isValid();
  }

  isValid() {
    let result: boolean;
    for (const key of Object.keys(this.validElements)) {
      result = this.validElements[key];
      if (!result) {
        break;
      }
    }
    this.valid.emit(result);
  }

  onKeyColumnChange(event) {
    this.item[event.column] = event.value;
  }

  isDisabled(column: Column) {
    if (column.keyColumn && !this.isNew) {
      return (this.table.settings.primaryKeys.indexOf(column.keyColumn) !== -1);
    } else {
      return false;
    }
  }

}
