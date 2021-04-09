import { ArgsType, Field } from "@nestjs/graphql";
import { TeamCreateInput } from "./TeamCreateInput";

@ArgsType()
class CreateTeamArgs {
  @Field(() => TeamCreateInput, { nullable: false })
  data!: TeamCreateInput;
}

export { CreateTeamArgs };
