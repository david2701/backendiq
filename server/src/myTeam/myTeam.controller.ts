import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MyTeamService } from "./myTeam.service";
import { MyTeamControllerBase } from "./base/myTeam.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("my-teams")
@common.Controller("my-teams")
export class MyTeamController extends MyTeamControllerBase {
  constructor(
    protected readonly service: MyTeamService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
