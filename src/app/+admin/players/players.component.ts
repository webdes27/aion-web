import {Component}  from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<crud-table [api]="api" [columns]="columns" [settings]="settings"></crud-table>`
})

export class PlayersComponent {

  public api: string = 'http://host3/players'; 
  public columns: Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Name', name: 'name', sortable: true, filter: true},
    {title: 'Race', name: 'race', sortable: true, filter: true},
    {title: 'Gender', name: 'gender', sortable: true, filter: true},
    {title: 'Exp', name: 'exp', sortable: true, filter: true},
  ];
  public settings:any = {
    crud: true,
    pageHeader: 'Players',
    primaryKey: 'id',
  };

}
