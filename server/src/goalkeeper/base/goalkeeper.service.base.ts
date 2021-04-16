import { PrismaService } from "nestjs-prisma";
import { Prisma, Goalkeeper, Team } from "@prisma/client";

export class GoalkeeperServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.GoalkeeperFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.GoalkeeperFindManyArgs>
  ): Promise<Goalkeeper[]> {
    return this.prisma.goalkeeper.findMany(args);
  }
  async findOne<T extends Prisma.GoalkeeperFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.GoalkeeperFindUniqueArgs>
  ): Promise<Goalkeeper | null> {
    return this.prisma.goalkeeper.findUnique(args);
  }
  async create<T extends Prisma.GoalkeeperCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.GoalkeeperCreateArgs>
  ): Promise<Goalkeeper> {
    return this.prisma.goalkeeper.create<T>(args);
  }
  async update<T extends Prisma.GoalkeeperUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.GoalkeeperUpdateArgs>
  ): Promise<Goalkeeper> {
    return this.prisma.goalkeeper.update<T>(args);
  }
  async delete<T extends Prisma.GoalkeeperDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.GoalkeeperDeleteArgs>
  ): Promise<Goalkeeper> {
    return this.prisma.goalkeeper.delete(args);
  }

  async getTeam(parentId: string): Promise<Team | null> {
    return this.prisma.goalkeeper
      .findUnique({
        where: { id: parentId },
      })
      .team();
  }
}
