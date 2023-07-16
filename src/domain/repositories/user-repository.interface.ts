import { Prisma, User } from '@prisma/client';
import { ISignIn } from '../interfaces/auth/sign-in.interface';

export interface UserRepository {
  signUp(data: Prisma.UserCreateInput): Promise<User>;
  signIn(data: Omit<ISignIn, 'password'>): Promise<User>;
  updateLastLogin(user_id: string): Promise<void>;
}
