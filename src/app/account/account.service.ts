import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { CrudService } from '../crud/crud.service';
import { RequestService } from '../services/request/request.service';

@Injectable()
export class AccountService extends CrudService {

    url = 'http://host5/account-datas';
    constructor(http: Http, request: RequestService) {
    	super(http, request);
    }

}
