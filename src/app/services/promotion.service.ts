import { Injectable } from '@angular/core';
import { Promotion }  from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions():Promise<Promotion[]>{
    return new Promise(reslove=>{
      setTimeout(()=>reslove(PROMOTIONS),2000)
    })
    //return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id:string):Promise<Promotion>{
    return new Promise(reslove=>{
      setTimeout(()=>reslove(PROMOTIONS.filter((promo)=>(promo.id==id))[0]),2000)
    })
    //return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.id==id))[0]);
  }

  getFeaturdePromotion():Promise<Promotion>{
    return new Promise(reslove=>{
      setTimeout(()=>reslove(PROMOTIONS.filter((promo)=>(promo.featured))[0]),2000)
    })
    //return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.featured))[0]);
  }

}
