import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PlayerLegendaryServiceBase } from "./base/playerLegendary.service.base";

@Injectable()
export class PlayerLegendaryService extends PlayerLegendaryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
