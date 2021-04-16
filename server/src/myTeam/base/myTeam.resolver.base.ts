import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateMyTeamArgs } from "./CreateMyTeamArgs";
import { UpdateMyTeamArgs } from "./UpdateMyTeamArgs";
import { DeleteMyTeamArgs } from "./DeleteMyTeamArgs";
import { MyTeamFindManyArgs } from "./MyTeamFindManyArgs";
import { MyTeamFindUniqueArgs } from "./MyTeamFindUniqueArgs";
import { MyTeam } from "./MyTeam";
import { PlayerFindManyArgs } from "../../player/base/PlayerFindManyArgs";
import { Player } from "../../player/base/Player";
import { MatchStart } from "../../matchStart/base/MatchStart";
import { MyTeamService } from "../myTeam.service";

@graphql.Resolver(() => MyTeam)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MyTeamResolverBase {
  constructor(
    protected readonly service: MyTeamService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [MyTeam])
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "any",
  })
  async myTeams(
    @graphql.Args() args: MyTeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MyTeam",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => MyTeam, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "own",
  })
  async myTeam(
    @graphql.Args() args: MyTeamFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "MyTeam",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => MyTeam)
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "create",
    possession: "any",
  })
  async createMyTeam(
    @graphql.Args() args: CreateMyTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "MyTeam",
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
        `providing the properties: ${properties} on ${"MyTeam"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        idMatch: args.data.idMatch
          ? {
              connect: args.data.idMatch,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => MyTeam)
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "update",
    possession: "any",
  })
  async updateMyTeam(
    @graphql.Args() args: UpdateMyTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MyTeam | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MyTeam",
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
        `providing the properties: ${properties} on ${"MyTeam"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          idMatch: args.data.idMatch
            ? {
                connect: args.data.idMatch,
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

  @graphql.Mutation(() => MyTeam)
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "delete",
    possession: "any",
  })
  async deleteMyTeam(
    @graphql.Args() args: DeleteMyTeamArgs
  ): Promise<MyTeam | null> {
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

  @graphql.ResolveField(() => [Player])
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "any",
  })
  async alternates(
    @graphql.Parent() parent: MyTeam,
    @graphql.Args() args: PlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const results = await this.service.findAlternates(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Player])
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "any",
  })
  async players(
    @graphql.Parent() parent: MyTeam,
    @graphql.Args() args: PlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const results = await this.service.findPlayers(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => MatchStart, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "MyTeam",
    action: "read",
    possession: "any",
  })
  async idMatch(
    @graphql.Parent() parent: MyTeam,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MatchStart | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MatchStart",
    });
    const result = await this.service.getIdMatch(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
