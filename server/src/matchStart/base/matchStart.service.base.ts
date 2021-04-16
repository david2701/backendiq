import { PrismaService } from "nestjs-prisma";
import { Prisma, MatchStart, Team, MyTeam } from "@prisma/client";

export class MatchStartServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.MatchStartFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchStartFindManyArgs>
  ): Promise<MatchStart[]> {
    return this.prisma.matchStart.findMany(args);
  }
  async findOne<T extends Prisma.MatchStartFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchStartFindUniqueArgs>
  ): Promise<MatchStart | null> {
    return this.prisma.matchStart.findUnique(args);
  }
  async create<T extends Prisma.MatchStartCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchStartCreateArgs>
  ): Promise<MatchStart> {
    return this.prisma.matchStart.create<T>(args);
  }
  async update<T extends Prisma.MatchStartUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchStartUpdateArgs>
  ): Promise<MatchStart> {
    return this.prisma.matchStart.update<T>(args);
  }
  async delete<T extends Prisma.MatchStartDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MatchStartDeleteArgs>
  ): Promise<MatchStart> {
    return this.prisma.matchStart.delete(args);
  }

  async findAwayTeam(
    parentId: string,
    args: Prisma.TeamFindManyArgs
  ): Promise<Team[]> {
    return this.prisma.matchStart
      .findUnique({
        where: { id: parentId },
      })
      .awayTeam(args);
  }

  async findHomeTeam(
    parentId: string,
    args: Prisma.TeamFindManyArgs
  ): Promise<Team[]> {
    return this.prisma.matchStart
      .findUnique({
        where: { id: parentId },
      })
      .homeTeam(args);
  }

  async findMyTeams(
    parentId: string,
    args: Prisma.MyTeamFindManyArgs
  ): Promise<MyTeam[]> {
    return this.prisma.matchStart
      .findUnique({
        where: { id: parentId },
      })
      .myTeams(args);
  }
}
