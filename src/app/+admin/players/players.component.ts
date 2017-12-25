import {Component} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `
    <crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class PlayersComponent {

  public columns: Column[] = [
    {
      title: 'Id',
      name: 'id',
      frozen: true,
      resizeable: false,
      formHidden: true,
    },
    {
      title: 'Name',
      name: 'name',
      frozen: true,
      width: 250,
      validation: {pattern: '^[a-zA-Z ]+$'},
      editable: true,
      resizeable: false,
    },
    {
      title: 'Race',
      name: 'race',
      type: 'select',
      options: [
        {id: 'ASMODIANS', name: 'ASMODIANS'},
        {id: 'ELYOS', name: 'ELYOS'},
      ],
      editable: true,
    },
    {
      title: 'Cascading Select',
      name: 'note',
      editable: true,
      type: 'select',
      options: [
        {id: 'ASM1', name: 'ASM note 1', parentId: 'ASMODIANS'},
        {id: 'ASM2', name: 'ASM note 2', parentId: 'ASMODIANS'},
        {id: 'ASM3', name: 'ASM note 3', parentId: 'ASMODIANS'},
        {id: 'ASM4', name: 'ASM note 4', parentId: 'ASMODIANS'},
        {id: 'ELY1', name: 'ELY note 1', parentId: 'ELYOS'},
        {id: 'ELY2', name: 'ELY note 2', parentId: 'ELYOS'},
        {id: 'ELY3', name: 'ELY note 3', parentId: 'ELYOS'},
      ],
      dependsColumn: 'race',
    },
    {
      title: 'Gender',
      name: 'gender',
      type: 'radio',
      options: [
        {id: 'MALE', name: 'MALE'},
        {id: 'FEMALE', name: 'FEMALE'},
      ],
      editable: true,
    },
    {
      title: 'Exp',
      name: 'exp',
      type: 'number',
      validation: {required: true, minLength: 2, maxLength: 10},
      editable: true,
    },
    {
      title: 'Last online',
      name: 'last_online',
      type: 'date',
      editable: true,
    },
    {title: 'Player class', name: 'player_class', editable: true},
    {title: 'Online', name: 'online', editable: true},
    {title: 'Cube size', name: 'cube_size', editable: true},
    {title: 'Broker Kinah', name: 'brokerKinah', editable: true},
    {title: 'Bind point', name: 'bind_point', editable: true},
    {title: 'X', name: 'x', editable: true},
    {title: 'Y', name: 'y', editable: true},
    {title: 'Z', name: 'z', editable: true},
  ];

  public settings: Settings = {
    api: CONFIG.apiPlayers,
    crud: true,
    primaryKeys: ['id'],
    tableWidth: 820,
    scrollHeight: 380
  };

  public service: ICrudService;

  constructor(private http: HttpClient) {
    this.service = new YiiService(this.http);
  }

}
