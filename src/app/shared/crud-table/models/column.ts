import {ColumnBase} from './column-base';
import {getUid} from '../utils/id';
import {ISelectOption} from '../types';

export class Column extends ColumnBase {

  public id: number;

  constructor(init: Partial<ColumnBase>) {
    super();
    Object.assign(this, init);
    this.id = getUid();
    this.setDefaults();
  }

  setDefaults() {
    if (!this.width) {
      this.width = (this.name.length * 10) + 50;
      if (this.width < 150) {
        this.width = 150;
      }
    }
    if (!this.type) {
      if (this.options) {
        this.type = 'select';
      } else {
        this.type = 'text';
      }
    }
  }

  getOptions(dependsValue?: any): ISelectOption[] {
    if (this.options) {
      let options: ISelectOption[];
      if (typeof this.options === 'function') {
        options = this.options();
      } else {
        options = this.options;
      }
      if (this.dependsColumn && dependsValue) {
        return options.filter((value) => value.parentId === dependsValue);
      } else {
        return options;
      }
    }
  }

  getOptionName(value: any) {
    if (!this.options) {
      return value;
    }
    const options: ISelectOption[] = this.getOptions();
    let name;
    if (options && (value !== undefined || value !== null)) {
      const el: ISelectOption = options.find(o => {
        return o.id.toString() === value.toString();
      });
      name = (el) ? el.name : null;
    }
    return name || value;
  }

  validate(value: any) {
    const temp = [];
    if (!this.validation) {
      return temp;
    }
    const length: number = value ? value.length : 0;

    if (this.validation.required && !value) {
      temp.push(`${this.title} is required.`);
    }
    if (this.validation.minLength && length < this.validation.minLength) {
      temp.push(`${this.title} has to be at least ${this.validation.minLength} characters long. ActualLength: ${length}`);
    }
    if (this.validation.maxLength && length > this.validation.maxLength) {
      temp.push(`${this.title} can't be longer then ${this.validation.maxLength} characters. ActualLength: ${length}`);
    }
    if (this.validation.pattern && value) {
      const patternResult = this.patternValidate(value);
      if (patternResult) {
        temp.push(patternResult);
      }
    }
    return temp;
  }

  private patternValidate(value: any): string {
    const pattern: string | RegExp = this.validation.pattern;
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = `^${pattern}$`;
      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return regex.test(value) ? null : `${this.title} must match this pattern: ${regexStr}.`;
  }

}
