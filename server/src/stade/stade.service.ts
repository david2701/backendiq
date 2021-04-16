import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { StadeServiceBase } from "./base/stade.service.base";

@Injectable()
export class StadeService extends StadeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
