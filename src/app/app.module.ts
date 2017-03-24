import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content';

import {UserService} from './services/user/user.service';
import {StorageService} from './services/storage/storage.service';
import {RequestService} from './services/request/request.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';
import {LoadingService} from './services/loading';
import {CollapseDirective} from './shared/directives/collapse.directive';
import {DropdownDirective} from './shared/directives/dropdown.directive';

import {LoadingIndicator} from './services/loading';
import {StatComponent} from './stat/stat.component';
import {MenuComponent} from './menu/menu.component';
import {BalanceComponent} from './balance/balance.component';
import {UsermenuComponent} from './usermenu/usermenu.component';

import {IndexComponent} from './index/index.component';
import {PlayersComponent} from './players/players.component';
import {AbyssComponent} from './abyss/abyss.component';
import {LegionsComponent} from './legions/legions.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ContactComponent} from './contact/contact.component';
import {CharComponent} from './char/char.component';
import {CharDetailComponent} from './char/char-detail.component';
import {ExchangeComponent} from './exchange/exchange.component';
import {HistoryComponent} from './history/history.component';
import {PassComponent} from './pass/pass.component';
import {BonusComponent} from './bonus/bonus.component';
import {PayComponent} from './pay/pay.component';
import {RatesComponent} from './rates/rates.component';
import {UserModule} from './users';
import {CrudTableModule} from './shared/crud-table';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    LoadingIndicator,
    StatComponent, 
    MenuComponent, 
    BalanceComponent,
    UsermenuComponent,
    IndexComponent,
    PlayersComponent,
    AbyssComponent,
    LegionsComponent,
    SignupComponent,
    LoginComponent,
    ContactComponent,
    CharComponent,
    CharDetailComponent,
    ExchangeComponent,
    HistoryComponent,
    PassComponent,
    BonusComponent,
    PayComponent,
    RatesComponent,
    CollapseDirective,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    UserModule,
    CrudTableModule
  ],
  providers: [
    UserService,
    StorageService,
    RequestService,
    {provide: APP_CONFIG, useValue: CONFIG},
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
