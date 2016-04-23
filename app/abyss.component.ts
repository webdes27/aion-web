import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS, Http}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {BaseService} from './services/base.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/abyss.html',
  providers:[JSONP_PROVIDERS, BaseService]
})

export class AbyssComponent implements OnInit {
  items: Observable<string[]>;
  ranks: Array<any>;

  constructor (private _baseService: BaseService, private http: Http) {}

  getRanks() {
    this.http.get('app/data/ranks.json')
      .map(res => res.json())
      .subscribe(
        data => {
          this.ranks = data;
        },
        err => console.error(err)
        //() => console.log('done')
      );
  }

  getRankById = function(id){
    var data = this.ranks;
    function getName(code) {
      return data.filter(
        function(data){return data.id == code}
      );
    }
    var found = getName(id);
    return found[0].name;
  }

  ngOnInit() {
    this.getRanks();
    this.items = this._baseService.search('abyss');
  }
}
