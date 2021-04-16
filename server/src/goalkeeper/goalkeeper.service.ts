import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { GoalkeeperServiceBase } from "./base/goalkeeper.service.base";

@Injectable()
export class GoalkeeperService extends GoalkeeperServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
