import { Test, TestingModule } from '@nestjs/testing';
import { VisitsResolver } from './visits.resolver';

describe('VisitsResolver', () => {
  let resolver: VisitsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitsResolver],
    }).compile();

    resolver = module.get<VisitsResolver>(VisitsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
