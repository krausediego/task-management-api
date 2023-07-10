import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should hash a password correctly', async () => {
    const passwordHashed = await service.hash('password');

    expect(await service.compare('password', passwordHashed)).toBeTruthy();
  });

  it('Should hash a password divergent', async () => {
    const passwordHashed = await service.hash('password');

    expect(await service.compare('password1', passwordHashed)).toBeFalsy();
  });
});
