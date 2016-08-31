import { Injectable, Inject }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Char } from './char';
import { Product } from './product';
import { RequestService } from '../services/request/request.service';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class CharService {

	constructor(private http: Http, private requestService: RequestService, @Inject(APP_CONFIG) private config: Config) { }

	getChars(): Promise<Char[]> {
    let url = this.config.apiMychars;
    let headers = this.requestService.getAuthHeaders();
	  return this.http.get(url, {headers: headers})
	           .toPromise()
	           .then(response => response.json())
	           .catch(this.handleError);
	}

	getChar(id: number) {
	return this.getChars()
	           .then(chars => chars.filter(char => char.id === id)[0]);
	}

  getProducts(): Promise<Product[]> {
    let url = this.config.apiPayShop;
    let headers = this.requestService.getAuthHeaders();
    return this.http.get(url, {headers: headers})
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
  }

  byItem(id:number, charId:number, count:number = 1) {
    let url = this.config.apiBuyitem;
    let headers = this.requestService.getAuthHeaders();
    let item = {'id': id, 'charId':charId, 'count':count};
    return this.http
      .post(url, JSON.stringify(item), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
  	let errMsg = 'An error occurred. ';
    let messages = error.json();
    errMsg += (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if(messages) {
      errMsg += ' ' + JSON.stringify(messages);
    }
    console.error('An error occurred', error);
    return Promise.reject(errMsg);
  }

}
