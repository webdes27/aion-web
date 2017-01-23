import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {CrudService} from '../shared/crud-table/crud.service';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class HistoryService extends CrudService {

  constructor(http:Http, @Inject(APP_CONFIG) private config:Config) {
    super(http);
  }

  url = this.config.apiTransactions;

}
