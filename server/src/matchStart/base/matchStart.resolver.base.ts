import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateMatchStartArgs } from "./CreateMatchStartArgs";
import { UpdateMatchStartArgs } from "./UpdateMatchStartArgs";
import { DeleteMatchStartArgs } from "./DeleteMatchStartArgs";
import { MatchStartFindManyArgs } from "./MatchStartFindManyArgs";
import { MatchStartFindUniqueArgs } from "./MatchStartFindUniqueArgs";
import { MatchStart } from "./MatchStart";
import { TeamFindManyArgs } from "../../team/base/TeamFindManyArgs";
import { Team } from "../../team/base/Team";
import { MyTeamFindManyArgs } from "../../myTeam/base/MyTeamFindManyArgs";
import { MyTeam } from "../../myTeam/base/MyTeam";
import { MatchStartService } from "../matchStart.service";

@graphql.Resolver(() => MatchStart)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MatchStartResolverBase {
  constructor(
    protected readonly service: MatchStartService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [MatchStart])
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async matchStarts(
    @graphql.Args() args: MatchStartFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MatchStart[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MatchStart",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => MatchStart, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "own",
  })
  async matchStart(
    @graphql.Args() args: MatchStartFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MatchStart | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "MatchStart",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => MatchStart)
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "create",
    possession: "any",
  })
  async createMatchStart(
    @graphql.Args() args: CreateMatchStartArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MatchStart> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "MatchStart",
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
        `providing the properties: ${properties} on ${"MatchStart"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => MatchStart)
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async updateMatchStart(
    @graphql.Args() args: UpdateMatchStartArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MatchStart | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
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
        `providing the properties: ${properties} on ${"MatchStart"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => MatchStart)
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "delete",
    possession: "any",
  })
  async deleteMatchStart(
    @graphql.Args() args: DeleteMatchStartArgs
  ): Promise<MatchStart | null> {
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

  @graphql.ResolveField(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async awayTeam(
    @graphql.Parent() parent: MatchStart,
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findAwayTeam(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async homeTeam(
    @graphql.Parent() parent: MatchStart,
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findHomeTeam(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [MyTeam])
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async myTeams(
    @graphql.Parent() parent: MatchStart,
    @graphql.Args() args: MyTeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MyTeam",
    });
    const results = await this.service.findMyTeams(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
