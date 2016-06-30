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
	apiGetData: 'http://host3/data/status',
	apiSignup: 'http://host3/auth/signup',
	apiLogin: 'http://host3/auth/login',
  	apiContact: 'http://host3/auth/contact'
};
