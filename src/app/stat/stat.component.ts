import {Component, OnInit}  from '@angular/core';
import {Observable}       from 'rxjs/Observable';
import {StatService} from './/stat.service';
import {Stat} from './stat';


@Component({
  selector: 'my-stat',
  templateUrl: './stat.component.html',
  providers: [StatService]
})

export class StatComponent implements OnInit {
  errorMessage:string;
  items:Stat;
  mode = 'Observable';

  constructor(private statService:StatService) {
  }

  ngOnInit() {
    this.statService.getStat().subscribe(
      data => this.items = data,
      error => this.errorMessage = <any>error);
  }

  setLoginStatusClass() {
    let classes = {
      'text-danger': this.items.login_status == 'Off',
      'text-success': this.items.login_status == 'On',
    };
    return classes;
  }

  setGameStatusClass() {
    let classes = {
      'text-danger': this.items.game_status == 'Off',
      'text-success': this.items.game_status == 'On',
    };
    return classes;
  }

}
