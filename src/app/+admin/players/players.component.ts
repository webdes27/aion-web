import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<crud-table [columns]="columns" [settings]="settings"></crud-table>`
})

export class PlayersComponent {

    public columns: any[] = [
        { 
            title: 'Id', 
            name: 'id', 
            sortable: true, 
            filter: true, 
            frozen: true
        },
        { 
            title: 'Name', 
            name: 'name', 
            sortable: true, 
            filter: true, 
            frozen: true, 
            width: 250,
            validation: { pattern: '^[a-zA-Z ]+$' },
            editable: true,
        }, 
        {
            title: 'Race',
            name: 'race',
            sortable: true,
            filter: true,
            type: 'dropdown',
            options: [
                { id: 'ASMODIANS', name: 'ASMODIANS' },
                { id: 'ELYOS', name: 'ELYOS' },
            ],
            editable: true,
        }, 
        {
            title: 'Gender',
            name: 'gender',
            sortable: true,
            filter: true,
            type: 'radio',
            options: [
                { id: 'MALE', name: 'MALE' },
                { id: 'FEMALE', name: 'FEMALE' },
            ],
            editable: true,
        },
        { 
            title: 'Exp',
            name: 'exp',
            sortable: true,
            filter: true,
            type: 'number',
            validation: { required: true, minLength: 2, maxLength: 10 },
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
        { title: 'Player class', name: 'player_class', editable: true, },
        { title: 'Online', name: 'online', editable: true, },
        { title: 'Cube size', name: 'cube_size', editable: true, },
        { title: 'Broker Kinah', name: 'brokerKinah', editable: true, },
        { title: 'Bind point', name: 'bind_point', editable: true, },
        { title: 'X', name: 'x', editable: true, },
        { title: 'Y', name: 'y', editable: true, },
        { title: 'Z', name: 'z', editable: true, },

    ];
    public settings: any = {
        api: 'http://host3/players',
        crud: true,
        pageHeader: 'Players',
        primaryKey: 'id',
        type: 'yii', // ords or yii (default)
        tableWidth: 820,
        scrollHeight: 380,
    };

}
