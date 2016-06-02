import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { RequestService } from '../services/request/request.service';
import {Data} from './account';

@Injectable()
export class AccountService {
    
    constructor(private _http: Http, private _requestService: RequestService) {}

    private _url = 'http://host5/account-datas';

    getAccounts(page: number, filters?:{[s: string]: any;}, sortField?: string, sortOrder?: number) : Promise<Data> {
        let headers = this._requestService.getAuthHeaders();
        let url = this._url+"?page="+page+this.urlEncode(filters)+this.urlSort(sortField, sortOrder)
        //console.log(url);
        return this._http.get(url, { headers: headers })
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

  private urlEncode(obj: {[s: string]: any;}): string {
    let urlSearchParams = new URLSearchParams();
    for (let key in obj) {
        if(obj[key]['value']) {
          urlSearchParams.append(key, obj[key]['value']);
        }
    }
    let url = urlSearchParams.toString();
    return (url) ? '&' + url : '';
  }

  private urlSort(sortField: string, sortOrder: number): string {
    if(sortField) {
      if (sortOrder>0) {
        return '&sort='+ sortField;
      } else {
        return '&sort=-'+ sortField;
      }
    } else {
      return '';
    }
  } 

}