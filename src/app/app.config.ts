import {OpaqueToken} from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface Config {
	title: string,
	apiGetData: string,
	apiSignup: string,
	apiLogin: string,
	apiContact: string
}

export const CONFIG:Config = {
	title: 'AION Kristall',
	apiGetData: 'http://host5/api/data',
	apiSignup: 'http://host5/api/signup',
	apiLogin: 'http://host5/api/login',
  	apiContact: 'http://host5/api/contact'
};
