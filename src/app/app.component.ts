import {Component} from '@angular/core';
import {AppState} from './app.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'AION Kristall';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState:AppState) {

  }

  ngOnInit() {
    //console.log('Initial App State', this.appState.state);
  }


}
