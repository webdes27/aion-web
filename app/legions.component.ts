import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS, Http, HTTP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {BaseService} from './base.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/legions.html',
  providers:[JSONP_PROVIDERS, BaseService, HTTP_PROVIDERS]
})

export class LegionsComponent implements OnInit {
  items: Observable<string[]>;

  constructor (private _baseService: BaseService, private http: Http) {}

  ngOnInit() {
    this.items = this._baseService.search('legions');
  }
}
