import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CollapseModule } from 'ng2-bootstrap/collapse';

import {UserService} from './services/user/user.service';
import {StorageService} from './services/storage/storage.service';
import {RequestService} from './services/request/request.service';
import {CONFIG, Config, APP_CONFIG} from './app.config';
import {LoadingService} from './services/loading';

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

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
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
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    DropdownModule.forRoot(),
    CollapseModule.forRoot(),
    UserModule,
    CrudTableModule
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

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
