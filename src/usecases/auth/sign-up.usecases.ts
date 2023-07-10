import { Prisma } from '@prisma/client';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { UserRepository } from 'src/domain/repositories/user-repository.interface';

export class SignUpUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<void> {
    const { password } = data;

    const passwordHashed = await this.bcryptService.hash(password);

    await this.userRepository.signUp({
      ...data,
      password: passwordHashed,
    });
  }
}
