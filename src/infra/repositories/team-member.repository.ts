import { Injectable } from '@nestjs/common';
import { TeamMember } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { IFindTeamMember, TeamMemberRepository } from 'src/domain/repositories';

@Injectable()
export class DatabaseTeamMemberRepository implements TeamMemberRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findTeamMember(data: IFindTeamMember): Promise<TeamMember[]> {
    const { user_id } = data;

    return this.prismaService.teamMember.findMany({
      where: {
        user_id,
      },
    });
  }
}
