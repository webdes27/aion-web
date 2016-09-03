import {FormControl} from '@angular/forms';

const EMAIL_REG = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export function validateEmail(control:FormControl):{ [s:string]:boolean } {
  return EMAIL_REG.test(control.value) ? undefined : {validEmail: true};
}
