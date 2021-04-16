import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamWhereUniqueInput } from "./MyTeamWhereUniqueInput";

@ArgsType()
class DeleteMyTeamArgs {
  @Field(() => MyTeamWhereUniqueInput, { nullable: false })
  where!: MyTeamWhereUniqueInput;
}

export { DeleteMyTeamArgs };
