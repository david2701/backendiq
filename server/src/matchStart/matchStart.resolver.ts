import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { MatchStartResolverBase } from "./base/matchStart.resolver.base";
import { MatchStart } from "./base/MatchStart";
import { MatchStartService } from "./matchStart.service";

@graphql.Resolver(() => MatchStart)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MatchStartResolver extends MatchStartResolverBase {
  constructor(
    protected readonly service: MatchStartService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
