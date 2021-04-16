import { Module } from "@nestjs/common";
import { PlayerLegendaryModuleBase } from "./base/playerLegendary.module.base";
import { PlayerLegendaryService } from "./playerLegendary.service";
import { PlayerLegendaryController } from "./playerLegendary.controller";
import { PlayerLegendaryResolver } from "./playerLegendary.resolver";

@Module({
  imports: [PlayerLegendaryModuleBase],
  controllers: [PlayerLegendaryController],
  providers: [PlayerLegendaryService, PlayerLegendaryResolver],
  exports: [PlayerLegendaryService],
})
export class PlayerLegendaryModule {}
