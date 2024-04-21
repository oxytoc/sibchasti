import { Test, TestingModule } from '@nestjs/testing';
import { PopularPartsService } from './popular-parts.service';

describe('PopularPartsService', () => {
  let service: PopularPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularPartsService],
    }).compile();

    service = module.get<PopularPartsService>(PopularPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
