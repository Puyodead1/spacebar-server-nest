import { Test, TestingModule } from '@nestjs/testing';
import { UniqueUsernameController } from './unique-username.controller';

describe('UniqueUsernameController', () => {
  let controller: UniqueUsernameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniqueUsernameController],
    }).compile();

    controller = module.get<UniqueUsernameController>(UniqueUsernameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
