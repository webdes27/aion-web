import {Injectable, Inject} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';
import 'rxjs/Rx';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class BaseService {
  constructor(private _jsonp: Jsonp, @Inject(APP_CONFIG) private _config: Config) {}
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