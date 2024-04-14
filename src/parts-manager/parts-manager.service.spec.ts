import { Test, TestingModule } from '@nestjs/testing';
import { PartsManagerService } from './parts-manager.service';

describe('PartsManagerService', () => {
  let service: PartsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsManagerService],
    }).compile();

    service = module.get<PartsManagerService>(PartsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
