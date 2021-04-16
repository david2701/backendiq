import { PrismaService } from "nestjs-prisma";
import { Prisma, PlayerLegendary, Team } from "@prisma/client";

export class PlayerLegendaryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.PlayerLegendaryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerLegendaryFindManyArgs>
  ): Promise<PlayerLegendary[]> {
    return this.prisma.playerLegendary.findMany(args);
  }
  async findOne<T extends Prisma.PlayerLegendaryFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerLegendaryFindUniqueArgs>
  ): Promise<PlayerLegendary | null> {
    return this.prisma.playerLegendary.findUnique(args);
  }
  async create<T extends Prisma.PlayerLegendaryCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerLegendaryCreateArgs>
  ): Promise<PlayerLegendary> {
    return this.prisma.playerLegendary.create<T>(args);
  }
  async update<T extends Prisma.PlayerLegendaryUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerLegendaryUpdateArgs>
  ): Promise<PlayerLegendary> {
    return this.prisma.playerLegendary.update<T>(args);
  }
  async delete<T extends Prisma.PlayerLegendaryDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlayerLegendaryDeleteArgs>
  ): Promise<PlayerLegendary> {
    return this.prisma.playerLegendary.delete(args);
  }

  async getTeam(parentId: string): Promise<Team | null> {
    return this.prisma.playerLegendary
      .findUnique({
        where: { id: parentId },
      })
      .team();
  }
}
