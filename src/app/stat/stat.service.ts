import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Stat}           from './stat';
import {Observable}     from 'rxjs/Observable';
import {CONFIG} from '../app.config';

@Injectable()
export class StatService {
  constructor(private http:Http) {
  }

  private url = CONFIG.apiGetStat;
;  // URL to web API

  getStat():Observable<Stat> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
