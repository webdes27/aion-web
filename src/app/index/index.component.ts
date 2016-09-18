import {Component, Inject} from '@angular/core';
import {Config, APP_CONFIG} from './../app.config';

@Component({
  selector: 'my-app',
  templateUrl: './index.component.html'
})
export class IndexComponent {
	title = this.config.title;

	constructor(@Inject(APP_CONFIG) private config:Config) {

	}

}
