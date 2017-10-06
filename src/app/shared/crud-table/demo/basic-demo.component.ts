import {Component} from '@angular/core';
import {Column, Settings, ICrudService, DemoService} from '../index';

@Component({
  selector: 'basic-demo',
  template: `
    <crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class BasicDemoComponent {

  public service: ICrudService;

  constructor() {
    this.service = new DemoService();
  }

  public settings: Settings = {
    api: 'http://host3/players',
    crud: true,
    primaryKey: 'id',
    type: 'demo', // ords or yii (default)
    tableWidth: 820,
    scrollHeight: 380,
  };

  public columns: Column[] = [
    {
      title: 'Id',
      name: 'id',
      sortable: true,
      filter: true,
      frozen: true,
      width: 100,
    },
    {
      title: 'Name',
      name: 'name',
      sortable: true,
      filter: true,
      frozen: true,
      width: 200,
      validation: {pattern: '^[a-zA-Z ]+$'},
      editable: true,
    },
    {
      title: 'Race',
      name: 'race',
      sortable: true,
      filter: true,
      type: 'dropdown',
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
      type: 'dropdown',
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
      sortable: true,
      filter: true,
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
      sortable: true,
      filter: true,
      type: 'number',
      validation: {required: true, minLength: 2, maxLength: 10},
      editable: true,
    },
    {
      title: 'Last online',
      name: 'last_online',
      sortable: true,
      filter: true,
      type: 'date',
      editable: true,
    },
    {title: 'Account name', name: 'account_name', editable: true,},
    {title: 'Account id', name: 'account_id', editable: true,},
    {title: 'Player class', name: 'player_class', editable: true,},
    {title: 'Online', name: 'online', editable: true,},
    {title: 'Cube size', name: 'cube_size', editable: true,},
    {title: 'Broker Kinah', name: 'brokerKinah', editable: true,},
    {title: 'Bind point', name: 'bind_point', editable: true,},
    {title: 'X', name: 'x', editable: true,},
    {title: 'Y', name: 'y', editable: true,},
    {title: 'Z', name: 'z', editable: true,},
    {title: 'Recoverexp', name: 'recoverexp', editable: true,},
    {title: 'Heading', name: 'heading', editable: true,},
    {title: 'World id', name: 'world_id', editable: true,},
    {title: 'Creation date', name: 'creation_date', editable: true, type: 'date'},
    {title: 'Stigma slot size', name: 'advanced_stigma_slot_size', editable: true,},
    {title: 'Warehouse size', name: 'warehouse_size', editable: true,},
    {title: 'Mailbox Letters', name: 'mailboxLetters', editable: true,},
    {title: 'Mailbox Un Read Letters', name: 'mailboxUnReadLetters', editable: true,},
    {title: 'Title id', name: 'title_id', editable: true,},
    {title: 'Repletion state', name: 'repletionstate', editable: true,},
    {title: 'Rebirth id', name: 'rebirth_id', editable: true,},
    {title: 'Member points', name: 'memberpoints', editable: true,},
    {title: 'Marry player id', name: 'marry_player_id', editable: true,},
    {title: 'Marry title', name: 'marrytitle', editable: true,},
    {title: 'Bg points', name: 'bg_points', editable: true,},
    {title: 'Personal rating', name: 'personal_rating', editable: true,},
    {title: 'Arena points', name: 'arena_points', editable: true,},
    {title: 'Partner id', name: 'partner_id', editable: true,},
    {title: 'Deletion date', name: 'deletion_date', editable: true,},
  ];

}
