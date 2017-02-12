import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Config, APP_CONFIG} from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  public name: string

  constructor(@Inject(APP_CONFIG) private config:Config) {
  	this.name = this.config.title;
  }

  ngOnInit() {
  }


}
