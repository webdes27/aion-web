import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CONFIG} from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  public name: string

  constructor() {
  	this.name = CONFIG.title;
  }

  ngOnInit() {
  }


}
