import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class BaseService {
  constructor(private jsonp: Jsonp) {}
  search (term: string) {
    let url = 'http://aion.kristal-lab.ru/client/index.php/site/getdata';
    var params = new URLSearchParams();
    params.set('type', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp
               .get(url, { search: params })
               .map(request => request.json());
               // .do(data => console.log(data));
  }
}