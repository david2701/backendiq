import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { GoalkeeperService } from "./goalkeeper.service";
import { GoalkeeperControllerBase } from "./base/goalkeeper.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("goalkeepers")
@common.Controller("goalkeepers")
export class GoalkeeperController extends GoalkeeperControllerBase {
  constructor(
    protected readonly service: GoalkeeperService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
