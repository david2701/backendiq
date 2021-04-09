import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { MatchStartService } from "../matchStart.service";
import { MatchStartCreateInput } from "./MatchStartCreateInput";
import { MatchStartWhereInput } from "./MatchStartWhereInput";
import { MatchStartWhereUniqueInput } from "./MatchStartWhereUniqueInput";
import { MatchStartUpdateInput } from "./MatchStartUpdateInput";
import { MatchStart } from "./MatchStart";
import { TeamWhereInput } from "../../team/base/TeamWhereInput";
import { Team } from "../../team/base/Team";
import { MyTeamWhereInput } from "../../myTeam/base/MyTeamWhereInput";
import { MyTeam } from "../../myTeam/base/MyTeam";

export class MatchStartControllerBase {
  constructor(
    protected readonly service: MatchStartService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: MatchStart })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: MatchStartCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<MatchStart> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"MatchStart"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        awayScore: true,
        createdAt: true,
        date: true,
        homeScore: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [MatchStart] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: MatchStartWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<MatchStart[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MatchStart",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        awayScore: true,
        createdAt: true,
        date: true,
        homeScore: true,
        id: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: MatchStart })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: MatchStartWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<MatchStart | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "MatchStart",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        awayScore: true,
        createdAt: true,
        date: true,
        homeScore: true,
        id: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: MatchStart })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body()
    data: MatchStartUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<MatchStart | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"MatchStart"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          awayScore: true,
          createdAt: true,
          date: true,
          homeScore: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: MatchStart })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: MatchStartWhereUniqueInput
  ): Promise<MatchStart | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          awayScore: true,
          createdAt: true,
          date: true,
          homeScore: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/awayTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async findManyAwayTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Query() query: TeamWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findAwayTeam(params.id, {
      where: query,
      select: {
        colorA: true,
        colorB: true,
        colorC: true,

        country: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        logo: true,

        matchStart: {
          select: {
            id: true,
          },
        },

        name: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/awayTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async createAwayTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      awayTeam: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/awayTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async updateAwayTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      awayTeam: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/awayTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async deleteAwayTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      awayTeam: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/homeTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async findManyHomeTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Query() query: TeamWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findHomeTeam(params.id, {
      where: query,
      select: {
        colorA: true,
        colorB: true,
        colorC: true,

        country: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        logo: true,

        matchStart: {
          select: {
            id: true,
          },
        },

        name: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/homeTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async createHomeTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      homeTeam: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/homeTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async updateHomeTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      homeTeam: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/homeTeam")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async deleteHomeTeam(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      homeTeam: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/myTeams")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "read",
    possession: "any",
  })
  async findManyMyTeams(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Query() query: MyTeamWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<MyTeam[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MyTeam",
    });
    const results = await this.service.findMyTeams(params.id, {
      where: query,
      select: {
        createdAt: true,
        id: true,

        idMatch: {
          select: {
            id: true,
          },
        },

        scoreTotal: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/myTeams")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async createMyTeams(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      myTeams: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/myTeams")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async updateMyTeams(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      myTeams: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/myTeams")
  @nestAccessControl.UseRoles({
    resource: "MatchStart",
    action: "update",
    possession: "any",
  })
  async deleteMyTeams(
    @common.Param() params: MatchStartWhereUniqueInput,
    @common.Body() body: MatchStartWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      myTeams: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MatchStart",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"MatchStart"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
