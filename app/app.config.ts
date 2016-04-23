import {OpaqueToken} from 'angular2/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface Config {
	title: string,
	apiGetData: string,
	apiSignup: string,
	apiLogin: string
}

export const CONFIG:Config = {
	title: 'AION Kristall',
	apiGetData: 'http://aion.kristal-lab.ru/client/index.php/site/getdata',
	apiSignup: 'http://host3/site/signupjson',
	apiLogin: 'http://host3/site/loginjson'
};