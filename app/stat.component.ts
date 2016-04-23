import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {BaseService} from './services/base.service';

@Component({
  selector: 'my-stat',
  templateUrl: 'app/partials/stat.html',
  providers:[JSONP_PROVIDERS, BaseService]
})

export class StatComponent implements OnInit {
  items: Observable<string[]>;

  constructor (private _baseService: BaseService) {}

  ngOnInit() {
    this._baseService.search('stat').subscribe(res => {
      this.items = res;
    });
  }
}
