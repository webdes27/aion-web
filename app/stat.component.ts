import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS, HTTP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {AionService} from './aion.service';

@Component({
  selector: 'my-stat',
  templateUrl: 'app/partials/stat.html',
  providers:[JSONP_PROVIDERS, AionService, HTTP_PROVIDERS]
})

export class StatComponent implements OnInit {
  items: Observable<string[]>;

  constructor (private _aionService: AionService) {}

  ngOnInit() {
    this.items = this._aionService.search('stat');
  }
}
