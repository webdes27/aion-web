export class Product {
    id: number;
    type: string;
    pic: string;
    item_name: string;
    description: string;
    price: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }  
}