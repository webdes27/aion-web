import {Component, OnInit}  from '@angular/core';
import {Observable}       from 'rxjs/Observable';
import {BaseService} from './../services/base.service';

@Component({
  selector: 'my-app',
  template: require('./legions.html'),
  providers: [BaseService]
})

export class LegionsComponent implements OnInit {
  items:Observable<string[]>;

  constructor(private _baseService:BaseService) {
  }

  ngOnInit() {
    this.items = this._baseService.search('legions');
  }
}
