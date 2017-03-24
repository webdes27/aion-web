import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Char}        from './char';
import {Product}     from './product';
import {CharService} from './char.service';
import {LoadingService} from '../services/loading';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'char-detail',
  templateUrl: './char-detail.component.html',
  providers: [CharService],
})

export class CharDetailComponent implements OnInit {
  char:Char;
  errorMessage:string;
  products:Product[];
  result:boolean;
  resultMessage:string;

  constructor(private charService:CharService,
              private route:ActivatedRoute,
              private loadingService:LoadingService,
              private user:UserService,) {
  }

  getProducts() {
    this.charService
      .getProducts()
      .then(data => {
        this.products = data.items;
      })
      .catch(error => {
        this.errorMessage = JSON.stringify(error);
        console.log(error);
      });
  }

  byItem(id:number, charId:number, count:number = 1) {
    this.loadingService.show();
    this.charService.byItem(id, charId, count).then(data => {
      this.loadingService.hide();
      this.result = data.result;
      this.resultMessage = data.resultMessage;
      this.user.setUpdateStatus(true);
    }).catch(error => {
      this.loadingService.hide();
      this.errorMessage = JSON.stringify(error);
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.charService.getChar(id)
        .then(char => this.char = char);
      this.getProducts();
    });
  }

  goBack() {
      window.history.back();
  }
}
