import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateStadeArgs } from "./CreateStadeArgs";
import { UpdateStadeArgs } from "./UpdateStadeArgs";
import { DeleteStadeArgs } from "./DeleteStadeArgs";
import { StadeFindManyArgs } from "./StadeFindManyArgs";
import { StadeFindUniqueArgs } from "./StadeFindUniqueArgs";
import { Stade } from "./Stade";
import { Country } from "../../country/base/Country";
import { StadeService } from "../stade.service";

@graphql.Resolver(() => Stade)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StadeResolverBase {
  constructor(
    protected readonly service: StadeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Stade])
  @nestAccessControl.UseRoles({
    resource: "Stade",
    action: "read",
    possession: "any",
  })
  async stades(
    @graphql.Args() args: StadeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Stade[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Stade",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Stade, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Stade",
    action: "read",
    possession: "own",
  })
  async stade(
    @graphql.Args() args: StadeFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Stade | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Stade",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Stade)
  @nestAccessControl.UseRoles({
    resource: "Stade",
    action: "create",
    possession: "any",
  })
  async createStade(
    @graphql.Args() args: CreateStadeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Stade> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Stade",
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
        `providing the properties: ${properties} on ${"Stade"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        country: args.data.country
          ? {
              connect: args.data.country,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Stade)
  @nestAccessControl.UseRoles({
    resource: "Stade",
    action: "update",
    possession: "any",
  })
  async updateStade(
    @graphql.Args() args: UpdateStadeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Stade | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Stade",
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
        `providing the properties: ${properties} on ${"Stade"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          country: args.data.country
            ? {
                connect: args.data.country,
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

  @graphql.Mutation(() => Stade)
  @nestAccessControl.UseRoles({
    resource: "Stade",
    action: "delete",
    possession: "any",
  })
  async deleteStade(
    @graphql.Args() args: DeleteStadeArgs
  ): Promise<Stade | null> {
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

  @graphql.ResolveField(() => Country, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Stade",
    action: "read",
    possession: "any",
  })
  async country(
    @graphql.Parent() parent: Stade,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Country",
    });
    const result = await this.service.getCountry(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
