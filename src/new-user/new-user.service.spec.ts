import { Test, TestingModule } from '@nestjs/testing';
import { NewUserService } from './new-user.service';

describe('NewUserService', () => {
  let service: NewUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewUserService],
    }).compile();

    service = module.get<NewUserService>(NewUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
