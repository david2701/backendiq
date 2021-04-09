import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamWhereInput } from "./MyTeamWhereInput";

@ArgsType()
class MyTeamFindManyArgs {
  @Field(() => MyTeamWhereInput, { nullable: true })
  where?: MyTeamWhereInput;
}

export { MyTeamFindManyArgs };
