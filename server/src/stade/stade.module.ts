import { Module } from "@nestjs/common";
import { StadeModuleBase } from "./base/stade.module.base";
import { StadeService } from "./stade.service";
import { StadeController } from "./stade.controller";
import { StadeResolver } from "./stade.resolver";

@Module({
  imports: [StadeModuleBase],
  controllers: [StadeController],
  providers: [StadeService, StadeResolver],
  exports: [StadeService],
})
export class StadeModule {}
