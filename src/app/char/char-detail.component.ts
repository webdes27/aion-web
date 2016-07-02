import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Char}        from './char';
import {Product}     from './product';
import {CharService} from './char.service';
import { LoadingIndicator, LoadingService } from '../services/loading';

@Component({
  selector: 'char-detail',
  template: require('./char-detail.component.html'),
  providers: [CharService],
  directives: [LoadingIndicator]
})

export class CharDetailComponent implements OnInit {
  @Input() char:Char;
  @Output() close = new EventEmitter();
  errorMessage:string;
  navigated = false; // true if navigated here
  products:Product[];
  result:boolean;
  resultMessage:string;
  sub: any;

  constructor(private charService:CharService,
              private route:ActivatedRoute,
              private loadingService:LoadingService) {
  }

  getProducts() {
    this.charService
      .getProducts()
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        this.errorMessage = error;
        console.log(error);
      });
  }

  byItem(id:number, charId:number, count:number = 1) {
    this.loadingService.show();
    this.charService.byItem(id, charId, count).then(data => {
      this.loadingService.hide();
      this.result = data.result;
      this.resultMessage = data.resultMessage;
      console.log(data);
    }).catch(error => {
      this.loadingService.hide();
      this.errorMessage = error;
      console.log(error);
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.charService.getChar(id)
          .then(char => this.char = char);
        this.getProducts();
      } else {
        this.navigated = false;
        this.char = new Char();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedChar:Char = null) {
    this.close.emit(savedChar);
    if (this.navigated) {
      window.history.back();
    }
  }
}
