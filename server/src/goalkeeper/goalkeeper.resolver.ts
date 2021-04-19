import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GoalkeeperResolverBase } from "./base/goalkeeper.resolver.base";
import { Goalkeeper } from "./base/Goalkeeper";
import { GoalkeeperService } from "./goalkeeper.service";

@graphql.Resolver(() => Goalkeeper)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GoalkeeperResolver extends GoalkeeperResolverBase {
  constructor(
    protected readonly service: GoalkeeperService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
