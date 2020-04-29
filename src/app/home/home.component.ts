import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  dishErrMess:string;
  constructor(private dishService:DishService,
    private promotionService:PromotionService,private leaderService:LeaderService
    ,@Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturdeDish()
    .subscribe((dish)=>this.dish=dish,
    errmess=>this.dishErrMess=<any>errmess);
    this.promotionService.getFeaturdePromotion()
    .subscribe((promotion)=>this.promotion=promotion);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=>this.leader=leader);
  }

  // getUrl(){
  //   return this.baseURL;
  // }

}
