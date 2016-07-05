export class Char {
    id: number;
    name: string;
    account_id: number;
    account_name: number;
    exp: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
