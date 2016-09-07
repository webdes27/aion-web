import {Injectable, Inject} from '@angular/core';
import {Http, Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class BaseService {
  constructor(private jsonp:Jsonp, @Inject(APP_CONFIG) private config:Config) {
  }

  search(term:string) {
    let url = this.config.apiGetData;
    var params = new URLSearchParams();
    params.set('type', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp
      .get(url, {search: params})
      .map(request => request.json());
    // .do(data => console.log(data));
  }

}
