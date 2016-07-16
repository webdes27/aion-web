export class Balance {
	login: string;
    balance: number;
    credits: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
