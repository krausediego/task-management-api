import { Injectable } from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { IFindTeamByUserId, TeamRepository } from 'src/domain/repositories';

@Injectable()
export class DatabaseTeamRepository implements TeamRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findTeamByUserId(data: IFindTeamByUserId): Promise<Team[]> {
    const { user_id } = data;
    return this.prismaService.team.findMany({
      include: {
        team_members: {
          where: {
            user_id,
          },
        },
      },
    });
  }
}
