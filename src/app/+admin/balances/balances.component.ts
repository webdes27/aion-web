import {Component, OnInit}  from '@angular/core';

import {CONFIG} from '../../app.config';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings"></crud-table>`
})

export class PayBalanceComponent implements OnInit {

  public columns: Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Login', name: 'login', sortable: true, filter: true, editable: true},
    {title: 'Balance', name: 'balance', sortable: true, filter: true, editable: true},
  ];
  public settings:any = {
    api: CONFIG.apiPayBalance,
    crud: true,
    pageHeader: 'Балансы',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
