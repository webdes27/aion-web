import {Component, OnInit}  from 'angular2/core';
import {JSONP_PROVIDERS, Http}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {BaseService} from './services/base.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/players.html',
  providers:[JSONP_PROVIDERS, BaseService]
})

export class PlayersComponent implements OnInit {
  items: Observable<string[]>;
  levels: Array<any>;
  titles: Array<any>;
  worlds: Array<any>;

  constructor (private _baseService: BaseService, private http: Http) {}

  getLevels() {
    this.http.get('app/data/levels.json')
      .map(res => res.json())
      .subscribe(
        data => this.levels = data,
        err => console.error(err)
      );
  }

  getTitles() {
    this.http.get('app/data/titles.json')
      .map(res => res.json())
      .subscribe(
        data => this.titles = data,
        err => console.error(err)
      );
  }

  getWorlds() {
    this.http.get('app/data/worlds.json')
      .map(res => res.json())
      .subscribe(
        data => this.worlds = data,
        err => console.error(err)
      );
  }

  getWorld = function(id){
    var data = this.worlds;
    function getName(code) {
      return data.filter(
        function(data){return data.world_id == code}
      );
    }
    var found = getName(id);
    if (typeof found[0] === "undefined") {
    return 'Не известно';
    } else {
    return found[0].name;
    }
  }

  getTitle = function(id){
    var data = this.titles;
    function getName(code) {
      return data.filter(
        function(data){return data.title_id == code}
      );
    }
    var found = getName(id);
    if (typeof found[0] === "undefined") {
    return '-';
    } else {
    return found[0].name;
    }
  }

  getLevelByExp = function(exp) {
      var data = this.levels;
      var level = 0;
      for (var k in data) {
          if (parseInt(exp) <= parseInt(data[k].exp)) {
              level = data[k].level;
              break;
          }
      }
      return level;
  };

  ngOnInit() {
    this.getLevels();
    this.getTitles();
    this.getWorlds();
    this.items = this._baseService.search('players');
  }
}
