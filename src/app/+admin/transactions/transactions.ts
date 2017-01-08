export interface Item {
  id:number;
  ip:string;
  login:string;
  char_name:string;
  item_type:string;
  item_name:string;
  count:number;
  price_one:number;
  price_final:number;
  trans_date:number;
}

export interface Link {
  self:string;
  next:string;
  last:string;
}

export interface Meta {
  totalCount:number;
  pageCount:number;
  currentPage:number;
  perPage:number;
}

export interface Data {
  items:Item[];
  _links:Link;
  _meta:Meta;
}

export class PrimeItem implements Item {
  id:number;
  ip:string;
  login:string;
  char_name:string;
  item_type:string;
  item_name:string;
  count:number;
  price_one:number;
  price_final:number;
  trans_date:number;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
