import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {RequestService} from '../services/request/request.service';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class ExchangeService {

  constructor(private http: Http, private requestService: RequestService, @Inject(APP_CONFIG) private config: Config) {
  }

  exchange(credentials) {
  	let url = this.config.apiExchange;
    let headers = this.requestService.getAuthHeaders();
    return this.http
      .post(url, JSON.stringify(credentials), {headers: headers})
      		.toPromise()
            .then(res => res.json())
            .catch(this.handleError);
  }

  private handleError(error: any) {
  	let errMsg = 'An error occurred. ';
    let messages = error.json();
    errMsg += (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if(messages) {
      for (let i = 0, len = messages.length; i<len; i++) {
        errMsg +=' <br> ' + messages[i].message;
      };
    }
    console.error('An error occurred', error);
    return Promise.reject(errMsg);
  }

}
