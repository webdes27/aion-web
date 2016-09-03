export class Stat {
  login_status:string;
  game_status:string;
  count_online:number;
  count_account:number;
  count_char:number;
  count_male:number;
  count_female:number;
  count_elyos:number;
  count_asmodian:number;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
