import {Control} from 'angular2/common';
import {Headers, URLSearchParams } from 'angular2/http';

const EMAIL_REG = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const OPTS_REQ_JSON = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

export function validateEmail(control: Control) {
  return EMAIL_REG.test(control.value) ? undefined : { validEmail: true };
}

export function urlEncode(obj: Object): string {
    let urlSearchParams = new URLSearchParams();
    for (let key in obj) {
        urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
}
