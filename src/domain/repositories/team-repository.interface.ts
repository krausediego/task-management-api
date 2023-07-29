import { Team } from '@prisma/client';

export interface IFindTeamByUserId {
  user_id: string;
}

export interface TeamRepository {
  findTeamByUserId(data: IFindTeamByUserId): Promise<Team[]>;
}
