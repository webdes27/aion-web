import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RequestService} from '../services/request/request.service';
import {CONFIG} from '../app.config';

@Injectable()
export class ContactService {

  constructor(private _http:Http, private _requestService:RequestService) {
  }

  contact(credentials) {
    let headers = this._requestService.getJsonHeaders();
    return this._http
      .post(CONFIG.apiContact, JSON.stringify(credentials), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error:any) {
    let errMsg = 'An error occurred. ';
    let messages = error.json();
    errMsg += (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (messages) {
      for (let i = 0, len = messages.length; i < len; i++) {
        errMsg += ' <br> ' + messages[i].message;
      }
      ;
    }
    console.error('An error occurred', error);
    return Promise.reject(errMsg);
  }

}
