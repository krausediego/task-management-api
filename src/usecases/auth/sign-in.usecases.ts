import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { ITokenCache } from 'src/domain/cache/token.interface';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ISignIn } from 'src/domain/interfaces/auth/sign-in.interface';
import { UserRepository } from 'src/domain/repositories/user-repository.interface';

export class SignInUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exception: IException,
    private readonly jwt: IJwtService,
    private readonly tokenCache: ITokenCache,
  ) {}

  async validateLogin(
    data: ISignIn,
    remember?: boolean,
  ): Promise<{ id: string; token: string }> {
    const { emailOrUsername, password } = data;
    const secret = process.env.JWT_SECRET;
    const expires = 60;

    const user = await this.userRepository.signIn({ emailOrUsername });

    if (!user) {
      this.exception.forbiddenException({ message: 'User not found.' });
    }

    const passwordMatches = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!passwordMatches) {
      this.exception.badRequestException({ message: 'Passwords not matches.' });
    }

    const { id, username, email } = user;

    await this.userRepository.updateLastLogin(id);

    if (remember) {
      const token = this.jwt.createToken({ id, username, email }, secret);

      await this.tokenCache.setToken(id, token);

      return { token, id };
    } else {
      const token = this.jwt.createExpirationToken(
        { id, username, email },
        secret,
        expires,
      );

      await this.tokenCache.setExpirationToken(id, expires, token);

      return { token, id };
    }
  }
}
