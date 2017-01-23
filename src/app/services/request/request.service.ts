import {Injectable} from '@angular/core';
import {Headers, URLSearchParams} from '@angular/http';

import {StorageService} from '../storage/storage.service';

@Injectable()
export class RequestService {

  constructor(private storage:StorageService) {
  }

  getAuthHeaders() {
    let headers = this.getJsonHeaders();
    let authToken = this.storage.getAuthToken();

    headers.append('Authorization', `Bearer ${authToken}`);
    return headers;
  }

  getJsonHeaders() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getUrlencodedHeaders() {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    return headers;
  }

  urlEncode(obj:Object):string {
    let urlSearchParams = new URLSearchParams();
    for (let key in obj) {
      urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
  }

}
