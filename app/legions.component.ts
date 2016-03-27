import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS, Http, HTTP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {AionService} from './aion.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/legions.html',
  providers:[JSONP_PROVIDERS, AionService, HTTP_PROVIDERS]
})

export class LegionsComponent implements OnInit {
  items: Observable<string[]>;

  constructor (private _aionService: AionService, private http: Http) {}

  ngOnInit() {
    this.items = this._aionService.search('legions');
  }
}
