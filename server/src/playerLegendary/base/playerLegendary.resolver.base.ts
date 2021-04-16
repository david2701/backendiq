import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreatePlayerLegendaryArgs } from "./CreatePlayerLegendaryArgs";
import { UpdatePlayerLegendaryArgs } from "./UpdatePlayerLegendaryArgs";
import { DeletePlayerLegendaryArgs } from "./DeletePlayerLegendaryArgs";
import { PlayerLegendaryFindManyArgs } from "./PlayerLegendaryFindManyArgs";
import { PlayerLegendaryFindUniqueArgs } from "./PlayerLegendaryFindUniqueArgs";
import { PlayerLegendary } from "./PlayerLegendary";
import { Team } from "../../team/base/Team";
import { PlayerLegendaryService } from "../playerLegendary.service";

@graphql.Resolver(() => PlayerLegendary)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PlayerLegendaryResolverBase {
  constructor(
    protected readonly service: PlayerLegendaryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [PlayerLegendary])
  @nestAccessControl.UseRoles({
    resource: "PlayerLegendary",
    action: "read",
    possession: "any",
  })
  async playerLegendaries(
    @graphql.Args() args: PlayerLegendaryFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PlayerLegendary[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PlayerLegendary",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PlayerLegendary, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PlayerLegendary",
    action: "read",
    possession: "own",
  })
  async playerLegendary(
    @graphql.Args() args: PlayerLegendaryFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PlayerLegendary | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PlayerLegendary",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PlayerLegendary)
  @nestAccessControl.UseRoles({
    resource: "PlayerLegendary",
    action: "create",
    possession: "any",
  })
  async createPlayerLegendary(
    @graphql.Args() args: CreatePlayerLegendaryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PlayerLegendary> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PlayerLegendary",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"PlayerLegendary"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        team: args.data.team
          ? {
              connect: args.data.team,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => PlayerLegendary)
  @nestAccessControl.UseRoles({
    resource: "PlayerLegendary",
    action: "update",
    possession: "any",
  })
  async updatePlayerLegendary(
    @graphql.Args() args: UpdatePlayerLegendaryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PlayerLegendary | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PlayerLegendary",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"PlayerLegendary"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          team: args.data.team
            ? {
                connect: args.data.team,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => PlayerLegendary)
  @nestAccessControl.UseRoles({
    resource: "PlayerLegendary",
    action: "delete",
    possession: "any",
  })
  async deletePlayerLegendary(
    @graphql.Args() args: DeletePlayerLegendaryArgs
  ): Promise<PlayerLegendary | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Team, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PlayerLegendary",
    action: "read",
    possession: "any",
  })
  async team(
    @graphql.Parent() parent: PlayerLegendary,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const result = await this.service.getTeam(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
