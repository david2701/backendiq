import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamCreateInput } from "./MyTeamCreateInput";

@ArgsType()
class CreateMyTeamArgs {
  @Field(() => MyTeamCreateInput, { nullable: false })
  data!: MyTeamCreateInput;
}

export { CreateMyTeamArgs };
