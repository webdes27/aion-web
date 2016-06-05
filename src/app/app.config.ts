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
	apiGetData: 'http://host5/data/status',
	apiSignup: 'http://host5/auth/signup',
	apiLogin: 'http://host5/auth/login',
  	apiContact: 'http://host5/auth/contact'
};
