import { Prisma, User } from '@prisma/client';
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
    const expires = 60;

    const passwordHashed = await this.cryptPassword(password);

    const { id, username, email, last_login, created_at, updated_at } =
      await this.userRepository.signUp({
        ...data,
        password: passwordHashed,
      });

    const token = await this.generateToken(
      { id, username, email, last_login, created_at, updated_at },
      expires,
    );

    return { id, token };
  }

  private async cryptPassword(password: string): Promise<string> {
    return this.bcryptService.hash(password);
  }

  private async generateToken(
    data: Omit<User, 'password'>,
    expires: number,
  ): Promise<string> {
    const token = this.jwt.createExpirationToken(data, expires);

    await this.tokenCache.setExpirationToken(
      `token:${data.id}`,
      expires,
      token,
    );

    return token;
  }
}
