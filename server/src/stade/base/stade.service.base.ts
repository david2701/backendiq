import { PrismaService } from "nestjs-prisma";
import { Prisma, Stade, Country } from "@prisma/client";

export class StadeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.StadeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StadeFindManyArgs>
  ): Promise<Stade[]> {
    return this.prisma.stade.findMany(args);
  }
  async findOne<T extends Prisma.StadeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.StadeFindUniqueArgs>
  ): Promise<Stade | null> {
    return this.prisma.stade.findUnique(args);
  }
  async create<T extends Prisma.StadeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StadeCreateArgs>
  ): Promise<Stade> {
    return this.prisma.stade.create<T>(args);
  }
  async update<T extends Prisma.StadeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StadeUpdateArgs>
  ): Promise<Stade> {
    return this.prisma.stade.update<T>(args);
  }
  async delete<T extends Prisma.StadeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.StadeDeleteArgs>
  ): Promise<Stade> {
    return this.prisma.stade.delete(args);
  }

  async getCountry(parentId: string): Promise<Country | null> {
    return this.prisma.stade
      .findUnique({
        where: { id: parentId },
      })
      .country();
  }
}
