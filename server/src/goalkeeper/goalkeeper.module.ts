import { Module } from "@nestjs/common";
import { GoalkeeperModuleBase } from "./base/goalkeeper.module.base";
import { GoalkeeperService } from "./goalkeeper.service";
import { GoalkeeperController } from "./goalkeeper.controller";
import { GoalkeeperResolver } from "./goalkeeper.resolver";

@Module({
  imports: [GoalkeeperModuleBase],
  controllers: [GoalkeeperController],
  providers: [GoalkeeperService, GoalkeeperResolver],
  exports: [GoalkeeperService],
})
export class GoalkeeperModule {}
