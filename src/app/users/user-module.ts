import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './user.routes';

import { ModalComponent } from './modal.component';

import { UserListComponent } from './user-list.component';
import { UserCardComponent } from './user-card.component';
import { UserService } from './user.service';
import { ItemsService } from './items.service';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserListComponent, UserCardComponent, ModalComponent],
  exports: [UserCardComponent, UserCardComponent],
  providers: [UserService, ItemsService]
})
export class UserModule {
	  public static routes = routes;
}