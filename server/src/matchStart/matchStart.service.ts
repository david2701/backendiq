import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { MatchStartServiceBase } from "./base/matchStart.service.base";

@Injectable()
export class MatchStartService extends MatchStartServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
