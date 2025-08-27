import { Test, TestingModule } from '@nestjs/testing';
import { NewUserController } from './user.controller';
import { NewUserService } from './user.service';

describe('NewUserController', () => {
  let controller: NewUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewUserController],
      providers: [NewUserService],
    }).compile();

    controller = module.get<NewUserController>(NewUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
