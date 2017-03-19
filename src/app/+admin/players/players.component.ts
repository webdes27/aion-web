import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<crud-table [columns]="columns" [settings]="settings"></crud-table>`
})

export class PlayersComponent {

    public columns: any[] = [
        { title: 'Id', name: 'id', sortable: true, filter: true, frozen: true },
        { title: 'Name', name: 'name', sortable: true, filter: true, frozen: true, width:250 }, 
        {
            title: 'Race',
            name: 'race',
            sortable: true,
            filter: true,
            options: [
                { id: 'ASMODIANS', name: 'ASMODIANS' },
                { id: 'ELYOS', name: 'ELYOS' },
            ]
        }, 
        {
            title: 'Gender',
            name: 'gender',
            sortable: true,
            filter: true,
            options: [
                { id: 'MALE', name: 'MALE' },
                { id: 'FEMALE', name: 'FEMALE' },
            ]
        },
        { title: 'Exp', name: 'exp', sortable: true, filter: true },
        { title: 'Last online', name: 'last_online', sortable: true, filter: true }
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
