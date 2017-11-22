import {Component, Input, Output, OnInit, EventEmitter, HostBinding} from '@angular/core';
import {Column, ICrudService} from '../types/interfaces';
import {ColumnUtils} from '../utils/column-utils';
import {CustomValidator} from './custom-validator';


@Component({
  selector: 'app-form-dropdown',
  template: `
    <div class="df-group" [ngClass]="{'df-has-error':hasError()}">
      <label [attr.for]="column.name">{{column.title}}</label>

      <select class="df-control"
              [(ngModel)]="model"
              (focus)="beginValidate = true"
              [id]="column.name">
        <option></option>
        <option *ngFor="let opt of getOptions()" [ngValue]="opt.id">{{opt.name}}</option>
      </select>

      <div class="df-help-block">
        <span *ngFor="let err of errors()">{{err}}<br></span>
      </div>
    </div>
  `
})
export class DropdownComponent implements OnInit {

  @Input() public column: Column;
  @Input() public service: ICrudService;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() valid: EventEmitter<boolean> = new EventEmitter();

  @Input('value')
  set model(value) {
    if (this._model !== value) {
      this._model = value;
      this.valueChange.emit(this._model);
    }
  }

  @Input()
  set dependsValue(value) {
    this._dependsValue = value;
    this.setOptions();
  }

  get model() {
    return this._model;
  }

  get dependsValue() {
    return this._dependsValue;
  }

  private _model: any;
  private _options: any;
  private _dependsValue: any;
  public beginValidate: boolean;
  public loading: boolean = false;

  @HostBinding('class')
  get cssClass() {
    let cls = 'df-elem';
    if (this.loading) {
      cls += ' df-wait';
    }
    return cls;
  }

  constructor(private validator: CustomValidator) {
  }

  ngOnInit() {
  }

  setOptions() {
    if (this._dependsValue) {
      if (this.column.optionsUrl && this.service.getOptions) {
        this.loading = true;
        this.service.getOptions(this.column.optionsUrl, this._dependsValue).then((res) => {
          this._options = res;
          this.loading = false;
        }).catch(error => {
          this.loading = false;
        });
      }
    } else {
      this._options = null;
    }
  }

  getOptions() {
    if (this.column.optionsUrl) {
      return this._options;
    } else {
      return ColumnUtils.getOptions(this.column, this.dependsValue);
    }
  }

  errors() {
    if (this.beginValidate) {
      return this.validator.errors(this.column, this.model);
    }
  }

  hasError() {
    const hasError = this.validator.hasError(this.column, this.model);
    this.valid.emit(!hasError);
    return hasError;
  }

}
