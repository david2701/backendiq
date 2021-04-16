import { Module } from "@nestjs/common";
import { MyTeamModuleBase } from "./base/myTeam.module.base";
import { MyTeamService } from "./myTeam.service";
import { MyTeamController } from "./myTeam.controller";
import { MyTeamResolver } from "./myTeam.resolver";

@Module({
  imports: [MyTeamModuleBase],
  controllers: [MyTeamController],
  providers: [MyTeamService, MyTeamResolver],
  exports: [MyTeamService],
})
export class MyTeamModule {}
