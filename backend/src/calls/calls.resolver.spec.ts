import { Test, TestingModule } from '@nestjs/testing';
import { CallsResolver } from './calls.resolver';

describe('CallsResolver', () => {
  let resolver: CallsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallsResolver],
    }).compile();

    resolver = module.get<CallsResolver>(CallsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
