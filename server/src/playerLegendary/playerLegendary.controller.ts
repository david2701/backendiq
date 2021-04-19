import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PlayerLegendaryService } from "./playerLegendary.service";
import { PlayerLegendaryControllerBase } from "./base/playerLegendary.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("player-legendaries")
@common.Controller("player-legendaries")
export class PlayerLegendaryController extends PlayerLegendaryControllerBase {
  constructor(
    protected readonly service: PlayerLegendaryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
