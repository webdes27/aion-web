import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Char } from './char';
import { RequestService } from '../services/request/request.service';

@Injectable()
export class CharService {

  url = 'http://host5/data/mychars';
	constructor(private http: Http, private requestService: RequestService) { }

	getChars(): Promise<Char[]> {
    let headers = this.requestService.getAuthHeaders();
	  return this.http.get(this.url, {headers: headers})
	           .toPromise()
	           .then(response => response.json())
	           .catch(this.handleError);
	}

	getChar(id: number) {
	return this.getChars()
	           .then(chars => chars.filter(char => char.id === id)[0]);
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
