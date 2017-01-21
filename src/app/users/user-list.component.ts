import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { ItemsService } from './items.service';
import { IUser } from './user';
import { UserCardComponent } from './user-card.component';

@Component({
    selector: 'users',
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {

    users: IUser[];
    addingUser: boolean = false;

    constructor(private userService: UserService,
        private itemsService: ItemsService) { }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe((users: IUser[]) => {
                this.users = users;
            },
            error => {
                console.log('Failed to load users. ' + error);
            });
    }

    removeUser(user: any) {
        var _user: IUser = this.itemsService.getSerialized<IUser>(user.value);
        this.itemsService.removeItemFromArray<IUser>(this.users, _user);
        console.log(_user.name + ' has been removed');
    }

    userCreated(user: any) {
        var _user: IUser = this.itemsService.getSerialized<IUser>(user.value);
        this.addingUser = false;

        console.log(_user.name + ' has been created');
        console.log(_user.id);
        this.itemsService.setItem<IUser>(this.users, (u) => u.id == -1, _user);
        // todo fix user with id:-1
    }

    addUser() {
        this.addingUser = true;
        var newUser = { id: -1, name: '', avatar: 'avatar_05.png', profession: '', schedulesCreated: 0 };
        this.itemsService.addItemToStart<IUser>(this.users, newUser);
        //this.users.splice(0, 0, newUser);
    }

    cancelAddUser() {
        this.addingUser = false;
        this.itemsService.removeItems<IUser>(this.users, x => x.id < 0);
    }
}