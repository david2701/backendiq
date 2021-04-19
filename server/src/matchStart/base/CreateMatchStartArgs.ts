import { ArgsType, Field } from "@nestjs/graphql";
import { MatchStartCreateInput } from "./MatchStartCreateInput";

@ArgsType()
class CreateMatchStartArgs {
  @Field(() => MatchStartCreateInput, { nullable: false })
  data!: MatchStartCreateInput;
}

export { CreateMatchStartArgs };
