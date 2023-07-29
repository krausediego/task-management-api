import { TeamMember } from '@prisma/client';

export interface IFindTeamMember {
  user_id: string;
}

export interface TeamMemberRepository {
  findTeamMember(data: IFindTeamMember): Promise<TeamMember[]>;
}
