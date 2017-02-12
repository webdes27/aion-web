import {Component} from '@angular/core';
import {CONFIG} from './../app.config';

@Component({
  selector: 'my-app',
  templateUrl: './index.component.html'
})
export class IndexComponent {
	title = CONFIG.title;

	constructor() {

	}

}
