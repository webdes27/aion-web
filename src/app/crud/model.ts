export interface Item {
    id: number;
    name: string;
    activated: number;
    access_level: number;
    membership: number;
}

export interface Link {
    self: string;
    next: string;
    last: string;
}

export interface Meta {
    totalCount: number;
    pageCount: number;
    currentPage: number;
    perPage: number;
}

export interface Data {
    items: Item[];
    _links : Link;
    _meta: Meta;
}

export class PrimeItem implements Item {
  constructor(public id?, public name?, public activated?, public access_level?, public membership?) {}
}
