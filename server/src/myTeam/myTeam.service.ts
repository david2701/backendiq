import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { MyTeamServiceBase } from "./base/myTeam.service.base";

@Injectable()
export class MyTeamService extends MyTeamServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
