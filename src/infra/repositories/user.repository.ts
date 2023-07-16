import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ISignIn } from 'src/domain/interfaces/auth/sign-in.interface';
import { UserRepository } from 'src/domain/repositories/user-repository.interface';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async signIn(data: Omit<ISignIn, 'password'>): Promise<User> {
    const { emailOrUsername } = data;

    return this.prismaService.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }

  async updateLastLogin(user_id: string): Promise<void> {
    await this.prismaService.user.update({
      data: { last_login: new Date() },
      where: { id: user_id },
    });
  }
}
