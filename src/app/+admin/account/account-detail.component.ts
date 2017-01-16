import {Component, OnInit}  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Item, PrimeItem} from './account';
import {AccountService} from './account.service';
import {LoadingService} from '../../services/loading';

@Component({
  selector: 'account-detail',
  templateUrl: 'account-detail.component.html',
  providers: [AccountService]
})
export class AccountDetailComponent implements OnInit {

  id: number;
  item:Item;
  errorMessage:string;

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private service:AccountService, 
              private loadingService:LoadingService) {
  }

  ngOnInit(): void {
    // (+) converts string 'id' to a number
    this.id = +this.route.snapshot.params['id'];
    this.getItem();
  }

  getItem() {
    this.loadingService.show();
    this.service.getItem(this.id)
      .then(data => {
        this.loadingService.hide();
        this.item = data;
      })
      .catch(error => {
        this.loadingService.hide();
        this.errorMessage = error;
      });
  }

    goBack() {
        this.router.navigate(['/admin/account']);
    }

}