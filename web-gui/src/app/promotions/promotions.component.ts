import { Component } from '@angular/core';
import { Article } from '../news/news.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent {
  promoInfo: Article[] = [
    {  
      title: "В честь открытия магазина действует акция на первый заказ",  
      subTitle: "Скидка 15% на первый заказ по промокоду **START15**.",  
    },
  ]
}
