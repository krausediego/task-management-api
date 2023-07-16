import { Prisma } from '@prisma/client';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { ITokenCache } from 'src/domain/cache/token.interface';
import { UserRepository } from 'src/domain/repositories/user-repository.interface';

export class SignUpUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwt: IJwtService,
    private readonly tokenCache: ITokenCache,
  ) {}

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<{ id: string; token: string }> {
    const { password } = data;
    const secret = process.env.JWT_SECRET;

    const passwordHashed = await this.bcryptService.hash(password);

    const { id, username, email } = await this.userRepository.signUp({
      ...data,
      password: passwordHashed,
    });

    const token = this.jwt.createToken({ id, username, email }, secret);

    await this.tokenCache.setToken(id, token);

    return { id, token };
  }
}
