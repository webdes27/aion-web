import {Control} from '@angular/common';
import {Headers, URLSearchParams } from '@angular/http';

const EMAIL_REG = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export function getJsonHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
}

export function getUrlencodedHeaders() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return headers;
}

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
