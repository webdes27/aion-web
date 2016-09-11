import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {CrudService} from '../services/crud/crud.service';
import {RequestService} from '../services/request/request.service';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class TransactionsService extends CrudService {

  constructor(http:Http, request:RequestService, @Inject(APP_CONFIG) private config:Config) {
    super(http, request);
  }

  url = this.config.apiTransactions;
;

}
