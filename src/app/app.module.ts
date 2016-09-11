import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { XLarge } from './home/x-large';

import {
  DataTableModule,
  SharedModule,
  DialogModule,
  ButtonModule,
  InputTextModule
} from 'primeng/primeng';
import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap';

import {UserService} from './services/user/user.service';
import {StorageService} from './services/storage/storage.service';
import {RequestService} from './services/request/request.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';
import {LoadingService} from './services/loading';

import { LoadingIndicator } from './services/loading';
import {StatComponent} from './stat/stat.component';
import {MenuComponent} from './menu/menu.component';
import {BalanceComponent} from './balance/balance.component';

import {IndexComponent} from './index/index.component';
import {PlayersComponent} from './players/players.component';
import {AbyssComponent} from './abyss/abyss.component';
import {LegionsComponent} from './legions/legions.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ContactComponent} from './contact/contact.component';
import {AccountComponent} from './account/account.component';
import {CharComponent} from './char/char.component';
import {CharDetailComponent} from './char/char-detail.component';
import {ExchangeComponent} from './exchange/exchange.component';
import {PayBalanceComponent} from './balances/balances.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {HistoryComponent} from './history/history.component'

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    About,
    Home,
    NoContent,
    XLarge,
    LoadingIndicator,
    StatComponent, 
    MenuComponent, 
    BalanceComponent,
    IndexComponent,
    PlayersComponent,
    AbyssComponent,
    LegionsComponent,
    SignupComponent,
    LoginComponent,
    ContactComponent,
    AccountComponent,
    CharComponent,
    CharDetailComponent,
    ExchangeComponent,
    PayBalanceComponent,
    ShopComponent,
    TransactionsComponent,
    HistoryComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    DataTableModule,
    SharedModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    UserService,
    StorageService,
    RequestService,
    {provide: APP_CONFIG, useValue: CONFIG},
    LoadingService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
