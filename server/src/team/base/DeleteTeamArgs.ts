import { ArgsType, Field } from "@nestjs/graphql";
import { TeamWhereUniqueInput } from "./TeamWhereUniqueInput";

@ArgsType()
class DeleteTeamArgs {
  @Field(() => TeamWhereUniqueInput, { nullable: false })
  where!: TeamWhereUniqueInput;
}

export { DeleteTeamArgs };
