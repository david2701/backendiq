import { ArgsType, Field } from "@nestjs/graphql";
import { TeamWhereUniqueInput } from "./TeamWhereUniqueInput";
import { TeamUpdateInput } from "./TeamUpdateInput";

@ArgsType()
class UpdateTeamArgs {
  @Field(() => TeamWhereUniqueInput, { nullable: false })
  where!: TeamWhereUniqueInput;
  @Field(() => TeamUpdateInput, { nullable: false })
  data!: TeamUpdateInput;
}

export { UpdateTeamArgs };
