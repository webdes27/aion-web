import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {CONFIG} from '../app.config';

@Injectable()
export class BaseService {
  constructor(private http:Http) {
  }

  search(term:string) {
    let url = CONFIG.apiGetData + '?type=' + term;
    return this.http
      .get(url)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
