import { PrismaService } from "nestjs-prisma";
import { Prisma, MyTeam, Player, MatchStart } from "@prisma/client";

export class MyTeamServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.MyTeamFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MyTeamFindManyArgs>
  ): Promise<MyTeam[]> {
    return this.prisma.myTeam.findMany(args);
  }
  async findOne<T extends Prisma.MyTeamFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MyTeamFindUniqueArgs>
  ): Promise<MyTeam | null> {
    return this.prisma.myTeam.findUnique(args);
  }
  async create<T extends Prisma.MyTeamCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MyTeamCreateArgs>
  ): Promise<MyTeam> {
    return this.prisma.myTeam.create<T>(args);
  }
  async update<T extends Prisma.MyTeamUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MyTeamUpdateArgs>
  ): Promise<MyTeam> {
    return this.prisma.myTeam.update<T>(args);
  }
  async delete<T extends Prisma.MyTeamDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MyTeamDeleteArgs>
  ): Promise<MyTeam> {
    return this.prisma.myTeam.delete(args);
  }

  async findAlternates(
    parentId: string,
    args: Prisma.PlayerFindManyArgs
  ): Promise<Player[]> {
    return this.prisma.myTeam
      .findUnique({
        where: { id: parentId },
      })
      .alternates(args);
  }

  async findPlayers(
    parentId: string,
    args: Prisma.PlayerFindManyArgs
  ): Promise<Player[]> {
    return this.prisma.myTeam
      .findUnique({
        where: { id: parentId },
      })
      .players(args);
  }

  async getIdMatch(parentId: string): Promise<MatchStart | null> {
    return this.prisma.myTeam
      .findUnique({
        where: { id: parentId },
      })
      .idMatch();
  }
}
