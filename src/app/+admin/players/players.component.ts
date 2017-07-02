import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<crud-table [columns]="columns" [settings]="settings" [treeNodes]="treeNodes"></crud-table>`
})

export class PlayersComponent {

    public columns: any[] = [
        {
            title: 'Id', 
            name: 'id', 
            sortable: true, 
            filter: true, 
            frozen: true,
            resizeable: false,
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
            resizeable: false,
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
            title: 'Cascading Select',
            name: 'note',
            editable: true,
            type: 'dropdown',
            options: [
                { id: 'ASM1', name: 'ASM note 1', parentId: 'ASMODIANS' },
                { id: 'ASM2', name: 'ASM note 2', parentId: 'ASMODIANS' },
                { id: 'ASM3', name: 'ASM note 3', parentId: 'ASMODIANS' },
                { id: 'ASM4', name: 'ASM note 4', parentId: 'ASMODIANS' },
                { id: 'ELY1', name: 'ELY note 1', parentId: 'ELYOS' },
                { id: 'ELY2', name: 'ELY note 2', parentId: 'ELYOS' },
                { id: 'ELY3', name: 'ELY note 3', parentId: 'ELYOS' },
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
        treeViewWidth: 120,
    };

    public treeNodes: any[] = [
        {
            id: 'ASMODIANS',
            name: 'ASMODIANS',
            column: 'race',
            children: [
            {
                id: 'MALE',
                name: 'MALE',
                column: 'gender',
            }, 
            {
                id: 'FEMALE',
                name: 'FEMALE',
                column: 'gender',
            }],
        }, 
        {
            id: 'ELYOS',
            name: 'ELYOS',
            column: 'race',
            children: [
            {
                id: 'MALE',
                name: 'MALE',
                column: 'gender',
            }, 
            {
                id: 'FEMALE',
                name: 'FEMALE',
                column: 'gender',
            }],
        }
    ];

}
