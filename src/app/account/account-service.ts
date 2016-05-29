import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Data} from './account';

@Injectable()
export class AccountService {
    
    constructor(private _http: Http) {}

    private _url = 'http://host5/account-datas';

    getAccounts(page: number) : Promise<Data> {
        return this._http.get(this._url+"?page="+page)
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

    private handleError(error: any) {
      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error('An error occurred', error);
      return Promise.reject(errMsg);
    }

}