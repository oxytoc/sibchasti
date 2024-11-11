import { Body, Controller, Post } from '@nestjs/common';
import { PersonalOffersService } from './personal-offers.service';

@Controller('')
export class PersonalOffersController {
  constructor(private readonly personalOffersService: PersonalOffersService) {}

  @Post("getOffers")
  getRecommendations(@Body() getRecomend: { items: string[] },) {
    return this.personalOffersService.getRecommendations(getRecomend.items);
  }

  @Post("retrainOffers")
  retrain() {
    return this.personalOffersService.retrain();
  }
}
