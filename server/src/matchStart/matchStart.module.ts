import { Module } from "@nestjs/common";
import { MatchStartModuleBase } from "./base/matchStart.module.base";
import { MatchStartService } from "./matchStart.service";
import { MatchStartController } from "./matchStart.controller";
import { MatchStartResolver } from "./matchStart.resolver";

@Module({
  imports: [MatchStartModuleBase],
  controllers: [MatchStartController],
  providers: [MatchStartService, MatchStartResolver],
  exports: [MatchStartService],
})
export class MatchStartModule {}
