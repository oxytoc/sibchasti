import { Body, Controller, Post } from '@nestjs/common';
import { PersonalOffersService } from './personal-offers.service';

@Controller('')
export class PersonalOffersController {
  constructor(private readonly personalOffersService: PersonalOffersService) {}

  @Post("getOffers")
  getRecommendations(@Body() getRecomend: { userId: number },) {
    return this.personalOffersService.getRecommendations(getRecomend.userId);
  }

  @Post("retrainOffers")
  retrain() {
    return this.personalOffersService.retrain();
  }
}
