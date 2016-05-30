import {Control} from '@angular/common';

const EMAIL_REG = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export function validateEmail(control: Control) {
  return EMAIL_REG.test(control.value) ? undefined : { validEmail: true };
}
