import { Test, TestingModule } from '@nestjs/testing';
import { UniqueUsernameService } from './unique-username.service';

describe('UniqueUsernameService', () => {
  let service: UniqueUsernameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueUsernameService],
    }).compile();

    service = module.get<UniqueUsernameService>(UniqueUsernameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
