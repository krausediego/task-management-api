import { User, Team } from '@prisma/client';
import { Response } from 'express';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { ITokenCache } from 'src/domain/cache/token.interface';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ISignIn } from 'src/domain/interfaces/auth/sign-in.interface';
import { UserRepository, TeamRepository } from 'src/domain/repositories';

export class SignInUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly teamRepository: TeamRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exception: IException,
    private readonly jwt: IJwtService,
    private readonly tokenCache: ITokenCache,
  ) {}

  async validateLogin(
    data: ISignIn,
    remember?: boolean,
    res?: Response,
  ): Promise<{ id: string; token: string }> {
    const { emailOrUsername, password } = data;

    const expires = 60 * 60 * 24;

    const user = await this.checkUser({ emailOrUsername });

    await this.checkPasswordMatches(password, user.password);

    const { id, username, email, last_login, created_at, updated_at } = user;

    const teams = await this.findUserTeamMember(id);

    await this.userRepository.updateLastLogin(id);

    const token = await this.generateToken(
      remember,
      { id, username, email, last_login, created_at, updated_at, teams },
      expires,
    );

    res.cookie('id', id, { httpOnly: true, domain: 'localhost' });

    return { token, id };
  }

  private async checkUser(data: Omit<ISignIn, 'password'>): Promise<User> {
    const { emailOrUsername } = data;

    const user = await this.userRepository.signIn({ emailOrUsername });

    if (!user) {
      this.exception.forbiddenException({ message: 'User not found.' });
    }

    return user;
  }

  private async checkPasswordMatches(
    password: string,
    hashPassword: string,
  ): Promise<void> {
    const passwordMatches = await this.bcryptService.compare(
      password,
      hashPassword,
    );

    if (!passwordMatches) {
      this.exception.badRequestException({ message: 'Passwords not matches.' });
    }
  }

  private async findUserTeamMember(user_id: string): Promise<Team[]> {
    return this.teamRepository.findTeamByUserId({ user_id });
  }

  private async generateToken(
    remember: boolean,
    data: Omit<User, 'password'> & { teams: Team[] },
    expires: string | number,
  ): Promise<string> {
    if (remember) {
      const token = this.jwt.createToken(data);

      await this.tokenCache.setToken(`token:${data.id}`, token);

      return token;
    } else {
      const token = this.jwt.createExpirationToken(data, expires);

      await this.tokenCache.setExpirationToken(
        `token:${data.id}`,
        expires,
        token,
      );

      return token;
    }
  }
}
