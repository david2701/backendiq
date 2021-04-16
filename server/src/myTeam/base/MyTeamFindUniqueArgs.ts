import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamWhereUniqueInput } from "./MyTeamWhereUniqueInput";

@ArgsType()
class MyTeamFindUniqueArgs {
  @Field(() => MyTeamWhereUniqueInput, { nullable: false })
  where!: MyTeamWhereUniqueInput;
}

export { MyTeamFindUniqueArgs };
