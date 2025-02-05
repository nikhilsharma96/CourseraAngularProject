import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable,of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));

    //return of(LEADERS).pipe(delay(2000));

    /*return new Promise(reslove=>{
      setTimeout(()=>reslove(LEADERS),2000)
    })
    //return Promise.resolve(LEADERS);*/
  }

  getLeader(id:string):Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
    //return of(LEADERS.filter((leader)=>(leader.id==id))[0]).pipe(delay(2000));

    /*return new Promise(reslove=>{
      setTimeout(()=>reslove(LEADERS.filter((leader)=>(leader.id==id))[0]),2000)
    });
    //return Promise.resolve(LEADERS.filter((leader)=>(leader.id==id))[0]); */
  }

  getFeaturedLeader():Observable<Leader>{    
    return this.http.get<Leader[]>(baseURL + 'leadership?featured:true' )
      .pipe(map(leaders=>leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
    //return of(LEADERS.filter((leader)=>(leader.featured))[0]).pipe(delay(2000));

    /*return new Promise(reslove=>{
      setTimeout(()=>reslove(LEADERS.filter((leader)=>(leader.featured))[0]),2000)
    });
    //return Promise.resolve(LEADERS.filter((leader)=>(leader.featured))[0]);*/    
  }
}
