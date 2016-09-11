import {OpaqueToken} from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface Config {
  title:string,
  apiGetData:string,
  apiGetStat:string,
  apiSignup:string,
  apiLogin:string,
  apiContact:string,
  apiGetBalance:string,
  apiAccount:string,
  apiMychars:string,
  apiPayShop:string,
  apiBuyitem:string,
  apiExchange:string,
  apiPayBalance:string,
  apiTransactions:string,
}

let host = 'http://host3';

export const CONFIG:Config = {
  title: 'AION Kristall',
  apiGetData: host + '/data/status',
  apiGetStat: host + '/data/stat',
  apiSignup: host +'/auth/signup',
  apiLogin: host +'/auth/login',
  apiContact: host +'/auth/contact',
  apiGetBalance: host +'/data/balanse',
  apiAccount: host +'/account-datas',
  apiMychars: host +'/data/mychars',
  apiPayShop: host +'/pay-shop',
  apiBuyitem: host +'/data/buyitem',
  apiExchange: host +'/data/exchange',
  apiPayBalance: host +'/pay-balances',
  apiTransactions: host +'/pay-transactions',
};
