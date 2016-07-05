import {Component, Inject} from '@angular/core';
import {StatComponent} from './stat/stat.component';
import {MenuComponent} from './menu/menu.component';
import {AppState} from './app.service';

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  template: require('./app.html'),
  directives: [StatComponent, MenuComponent],
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'AION Kristall';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    //console.log('Initial App State', this.appState.state);
  }


}
