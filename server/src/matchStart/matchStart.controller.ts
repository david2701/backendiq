import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MatchStartService } from "./matchStart.service";
import { MatchStartControllerBase } from "./base/matchStart.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("match-starts")
@common.Controller("match-starts")
export class MatchStartController extends MatchStartControllerBase {
  constructor(
    protected readonly service: MatchStartService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
