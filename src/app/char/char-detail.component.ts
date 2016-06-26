import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RouteParams } from '@angular/router-deprecated';

import { Char }        from './char';
import { CharService } from './char.service';

@Component({
  selector: 'char-detail',
  template: require('./char-detail.component.html')
})

export class CharDetailComponent implements OnInit {
  @Input() char: Char;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private charService: CharService,
    private routeParams: RouteParams) {
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.charService.getChar(id)
          .then(char => this.char = char);
    } else {
      this.navigated = false;
      this.char = new Char();
    }
  }

  goBack(savedChar: Char = null) {
    this.close.emit(savedChar);
    if (this.navigated) { window.history.back(); }
  }
}
