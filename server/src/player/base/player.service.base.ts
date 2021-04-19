import { PrismaService } from "nestjs-prisma";
import { Prisma, Player, MyTeam, Team } from "@prisma/client";

export class PlayerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.PlayerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerFindManyArgs>
  ): Promise<Player[]> {
    return this.prisma.player.findMany(args);
  }
  async findOne<T extends Prisma.PlayerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerFindUniqueArgs>
  ): Promise<Player | null> {
    return this.prisma.player.findUnique(args);
  }
  async create<T extends Prisma.PlayerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerCreateArgs>
  ): Promise<Player> {
    return this.prisma.player.create<T>(args);
  }
  async update<T extends Prisma.PlayerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerUpdateArgs>
  ): Promise<Player> {
    return this.prisma.player.update<T>(args);
  }
  async delete<T extends Prisma.PlayerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerDeleteArgs>
  ): Promise<Player> {
    return this.prisma.player.delete(args);
  }

  async findAlternates(
    parentId: string,
    args: Prisma.MyTeamFindManyArgs
  ): Promise<MyTeam[]> {
    return this.prisma.player
      .findUnique({
        where: { id: parentId },
      })
      .Alternates(args);
  }

  async findMyTeams(
    parentId: string,
    args: Prisma.MyTeamFindManyArgs
  ): Promise<MyTeam[]> {
    return this.prisma.player
      .findUnique({
        where: { id: parentId },
      })
      .myTeams(args);
  }

  async getTeam(parentId: string): Promise<Team | null> {
    return this.prisma.player
      .findUnique({
        where: { id: parentId },
      })
      .team();
  }
}
