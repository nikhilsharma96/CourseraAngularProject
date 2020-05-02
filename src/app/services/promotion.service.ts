import { Injectable } from '@angular/core';
import { Promotion }  from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
    //return of(PROMOTIONS).pipe(delay(2000));

    /*return new Promise(reslove=>{
      setTimeout(()=>reslove(PROMOTIONS),2000)
    })
    //return Promise.resolve(PROMOTIONS);*/
  }

  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/'+ id)
      .pipe(catchError(this.processHTTPMsgService.handleError));

    //    return of(PROMOTIONS.filter((promo)=>(promo.id==id))[0]).pipe(delay(2000));

    /*return new Promise(reslove=>{
      setTimeout(()=>reslove(PROMOTIONS.filter((promo)=>(promo.id==id))[0]),2000)
    })
    //return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.id==id))[0]);*/
  }

  getFeaturdePromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured:true')
      .pipe(map(Promotions=>Promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

    // return of(PROMOTIONS.filter((promo)=>(promo.featured))[0]).pipe(delay(2000));

    /*return new Promise(reslove=>{
      setTimeout(()=>reslove(PROMOTIONS.filter((promo)=>(promo.featured))[0]),2000)
    })
    //return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.featured))[0]);*/
  }

}
