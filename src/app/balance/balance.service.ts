import { Injectable, Inject }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Balance }           from './balance';
import { Observable }     from 'rxjs/Observable';
import {Config, APP_CONFIG} from '../app.config';
import { RequestService } from '../services/request/request.service';

@Injectable()
export class BalanceService {
  constructor (private http: Http, private requestService: RequestService, @Inject(APP_CONFIG) private config: Config) {}

  private url = this.config.apiGetBalance;

  getData (): Observable<Balance> {
    let headers = this.requestService.getAuthHeaders();
    return this.http.get(this.url, {headers: headers})
                    .map(this.extractData)
                    .catch(this.handleError).cache();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
