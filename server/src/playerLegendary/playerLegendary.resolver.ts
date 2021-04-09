import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PlayerLegendaryResolverBase } from "./base/playerLegendary.resolver.base";
import { PlayerLegendary } from "./base/PlayerLegendary";
import { PlayerLegendaryService } from "./playerLegendary.service";

@graphql.Resolver(() => PlayerLegendary)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PlayerLegendaryResolver extends PlayerLegendaryResolverBase {
  constructor(
    protected readonly service: PlayerLegendaryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
