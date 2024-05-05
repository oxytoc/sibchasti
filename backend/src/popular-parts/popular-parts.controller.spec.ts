import { Test, TestingModule } from '@nestjs/testing';
import { PopularPartsController } from './popular-parts.controller';

describe('PopularPartsController', () => {
  let controller: PopularPartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularPartsController],
    }).compile();

    controller = module.get<PopularPartsController>(PopularPartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
