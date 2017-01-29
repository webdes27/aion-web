import { Component, Input, Output, OnInit, ViewContainerRef, EventEmitter, ViewChild,
    trigger,
    state,
    style,
    animate,
    transition  } from '@angular/core';

import { IUser } from './user';
import { UserService } from './user.service';
import { ItemsService } from './items.service';

import { ModalComponent } from './modal.component';

@Component({
    selector: 'user-card',
    templateUrl: 'user-card.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class UserCardComponent implements OnInit {
    @ViewChild('childModal')
    public readonly childModal: ModalComponent;

    @Input() user: IUser;
    @Output() removeUser = new EventEmitter();
    @Output() userCreated = new EventEmitter();

    edittedUser: IUser;
    onEdit: boolean = false;

    constructor(private itemsService: ItemsService,
        private userService: UserService) { }

    ngOnInit() {
        this.edittedUser = this.itemsService.getSerialized<IUser>(this.user);
        if (this.user.id < 0)
            this.editUser();
    }

    editUser() {
        this.onEdit = !this.onEdit;
        this.edittedUser = this.itemsService.getSerialized<IUser>(this.user);
    }

    createUser() {
        this.userService.createUser(this.edittedUser)
            .subscribe((userCreated) => {
                this.user = this.itemsService.getSerialized<IUser>(userCreated);
                this.edittedUser = this.itemsService.getSerialized<IUser>(this.user);
                this.onEdit = false;

                this.userCreated.emit({ value: userCreated });
            },
            error => {
                console.log('Failed to created user');
                console.log(error);
            });
    }

    updateUser() {
        this.userService.updateUser(this.edittedUser)
            .subscribe(() => {
                this.user = this.edittedUser;
                this.onEdit = !this.onEdit;
                console.log(this.user.name + ' has been updated');
            },
            error => {
                console.log('Failed to edit user');
                console.log(error);
            });
    }

    openRemoveModal() {
        this.userService.deleteUser(this.user.id)
            .subscribe(
            res => {
                this.removeUser.emit({
                    value: this.user
                });
            }, error => {
                console.log(error);
            })
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    isUserValid(): boolean {
        return !(this.edittedUser.name.trim() === "")
            && !(this.edittedUser.profession.trim() === "");
    }

}