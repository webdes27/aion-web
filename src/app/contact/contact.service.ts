import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import { RequestService } from '../services/request/request.service';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class ContactService {

  constructor(private _http: Http, private _requestService: RequestService, @Inject(APP_CONFIG) private _config: Config) {
  }

  contact(credentials) {
    return this._http
      .post(this._config.apiContact, JSON.stringify(credentials), { headers: this._requestService.getJsonHeaders() })
      .map(res => res.json());
  }

}
