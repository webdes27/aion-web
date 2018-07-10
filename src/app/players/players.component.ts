import {Component, OnInit}  from '@angular/core';
import {Observable}       from 'rxjs';
import {BaseService} from './../services/base.service';
import {Level, Levels} from './levels';
import {Title, Titles} from './titles';
import {World, Worlds} from './worlds';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  providers: [BaseService]
})

export class PlayersComponent implements OnInit {
  items:Observable<string[]>;

  constructor(private _baseService:BaseService) {
  }

  getWorld = function (id) {
    var data = Worlds;

    function getName(code) {
      return data.filter(
        function (data) {
          return data.id == code
        }
      );
    }

    var found = getName(id);
    if (typeof found[0] === "undefined") {
      return 'Не известно';
    } else {
      return found[0].name;
    }
  }

  getTitle = function (id) {
    var data = Titles;

    function getName(code) {
      return data.filter(
        function (data) {
          return data.id == code
        }
      );
    }

    var found = getName(id);
    if (typeof found[0] === "undefined") {
      return '-';
    } else {
      return found[0].name;
    }
  }

  getLevelByExp = function (exp) {
    var data = Levels;
    var level = '0';
    for (var k in data) {
      if (parseInt(exp) <= data[k].exp) {
        level = data[k].level;
        break;
      }
    }
    return level;
  };

  ngOnInit() {
    this.items = this._baseService.search('players');
  }
}
