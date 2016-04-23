import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS, Http}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {BaseService} from './services/base.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/legions.html',
  providers:[JSONP_PROVIDERS, BaseService]
})

export class LegionsComponent implements OnInit {
  items: Observable<string[]>;

  constructor (private _baseService: BaseService, private http: Http) {}

  ngOnInit() {
    this.items = this._baseService.search('legions');
  }
}
