import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StadeService } from "./stade.service";
import { StadeControllerBase } from "./base/stade.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("stades")
@common.Controller("stades")
export class StadeController extends StadeControllerBase {
  constructor(
    protected readonly service: StadeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
