import {OpaqueToken} from '@angular/core';
import {environment} from '../environments/environment';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface Config {
  title: string;
  apiGetData: string;
  apiGetStat: string;
  apiSignup: string;
  apiLogin: string;
  apiContact: string;
  apiGetBalance: string;
  apiAccount: string;
  apiMychars: string;
  apiPayShop: string;
  apiBuyitem: string;
  apiExchange: string;
  apiPayBalance: string;
  apiTransactions: string;
  apiPass: string;
  apiBonus: string;
  apiPlayers: string;
}

export const CONFIG: Config = {
  title: 'AION Kristall',
  apiGetData: environment.host + '/data/status',
  apiGetStat: environment.host + '/data/stat',
  apiSignup: environment.host + '/auth/signup',
  apiLogin: environment.host + '/auth/login',
  apiContact: environment.host + '/auth/contact',
  apiGetBalance: environment.host + '/data/balanse',
  apiAccount: environment.host + '/account-datas',
  apiMychars: environment.host + '/data/mychars',
  apiPayShop: environment.host + '/pay-shop',
  apiBuyitem: environment.host + '/data/buyitem',
  apiExchange: environment.host + '/data/exchange',
  apiPayBalance: environment.host + '/pay-balances',
  apiTransactions: environment.host + '/pay-transactions',
  apiPass: environment.host + '/auth/pass',
  apiBonus: environment.host + '/data/getbonus',
  apiPlayers: environment.host + '/players'
};
