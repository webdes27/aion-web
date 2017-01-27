import { Injectable } from '@angular/core';

@Injectable()
export class CrudTableConfig {
  public main: any = {
    crud: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last'
  };
}