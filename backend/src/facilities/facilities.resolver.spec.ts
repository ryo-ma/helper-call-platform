import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesResolver } from './facilities.resolver';

describe('FacilitiesResolver', () => {
  let resolver: FacilitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitiesResolver],
    }).compile();

    resolver = module.get<FacilitiesResolver>(FacilitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
