import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { GoalkeeperController } from "../goalkeeper.controller";
import { GoalkeeperService } from "../goalkeeper.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  age: 42,
  birthday: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  name: "exampleName",
  number: 42,
  positionGoalkeeper: 42,
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  age: 42,
  birthday: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  name: "exampleName",
  number: 42,
  positionGoalkeeper: 42,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    age: 42,
    birthday: new Date(),
    createdAt: new Date(),
    id: "exampleId",
    name: "exampleName",
    number: 42,
    positionGoalkeeper: 42,
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  age: 42,
  birthday: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  name: "exampleName",
  number: 42,
  positionGoalkeeper: 42,
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Goalkeeper", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: GoalkeeperService,
          useValue: service,
        },
      ],
      controllers: [GoalkeeperController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /goalkeepers", async () => {
    await request(app.getHttpServer())
      .post("/goalkeepers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        birthday: CREATE_RESULT.birthday.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /goalkeepers", async () => {
    await request(app.getHttpServer())
      .get("/goalkeepers")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          birthday: FIND_MANY_RESULT[0].birthday.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /goalkeepers/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/goalkeepers"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /goalkeepers/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/goalkeepers"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        birthday: FIND_ONE_RESULT.birthday.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
