import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { MyTeamResolverBase } from "./base/myTeam.resolver.base";
import { MyTeam } from "./base/MyTeam";
import { MyTeamService } from "./myTeam.service";

@graphql.Resolver(() => MyTeam)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MyTeamResolver extends MyTeamResolverBase {
  constructor(
    protected readonly service: MyTeamService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
