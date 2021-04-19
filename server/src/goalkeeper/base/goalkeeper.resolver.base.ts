import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateGoalkeeperArgs } from "./CreateGoalkeeperArgs";
import { UpdateGoalkeeperArgs } from "./UpdateGoalkeeperArgs";
import { DeleteGoalkeeperArgs } from "./DeleteGoalkeeperArgs";
import { GoalkeeperFindManyArgs } from "./GoalkeeperFindManyArgs";
import { GoalkeeperFindUniqueArgs } from "./GoalkeeperFindUniqueArgs";
import { Goalkeeper } from "./Goalkeeper";
import { Team } from "../../team/base/Team";
import { GoalkeeperService } from "../goalkeeper.service";

@graphql.Resolver(() => Goalkeeper)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GoalkeeperResolverBase {
  constructor(
    protected readonly service: GoalkeeperService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Goalkeeper])
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "read",
    possession: "any",
  })
  async goalkeepers(
    @graphql.Args() args: GoalkeeperFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Goalkeeper",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Goalkeeper, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "read",
    possession: "own",
  })
  async goalkeeper(
    @graphql.Args() args: GoalkeeperFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Goalkeeper",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Goalkeeper)
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "create",
    possession: "any",
  })
  async createGoalkeeper(
    @graphql.Args() args: CreateGoalkeeperArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Goalkeeper",
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
        `providing the properties: ${properties} on ${"Goalkeeper"} creation is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Goalkeeper)
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "update",
    possession: "any",
  })
  async updateGoalkeeper(
    @graphql.Args() args: UpdateGoalkeeperArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Goalkeeper | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Goalkeeper",
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
        `providing the properties: ${properties} on ${"Goalkeeper"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Goalkeeper)
  @nestAccessControl.UseRoles({
    resource: "Goalkeeper",
    action: "delete",
    possession: "any",
  })
  async deleteGoalkeeper(
    @graphql.Args() args: DeleteGoalkeeperArgs
  ): Promise<Goalkeeper | null> {
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
    resource: "Goalkeeper",
    action: "read",
    possession: "any",
  })
  async team(
    @graphql.Parent() parent: Goalkeeper,
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
