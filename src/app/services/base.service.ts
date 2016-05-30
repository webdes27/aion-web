import {Injectable, Inject} from '@angular/core';
import {Http, Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Config, APP_CONFIG} from '../app.config';
import { RequestService } from './request/request.service';

@Injectable()
export class BaseService {
  constructor(private _http: Http, private _jsonp: Jsonp, @Inject(APP_CONFIG) private _config: Config, private _requestService: RequestService) {}
  search (term: string) {
    let url = this._config.apiGetData;
    var params = new URLSearchParams();
    params.set('type', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this._jsonp
               .get(url, { search: params })
               .map(request => request.json());
               // .do(data => console.log(data));
  }

}
