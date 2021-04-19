import { ArgsType, Field } from "@nestjs/graphql";
import { MatchStartWhereInput } from "./MatchStartWhereInput";

@ArgsType()
class MatchStartFindManyArgs {
  @Field(() => MatchStartWhereInput, { nullable: true })
  where?: MatchStartWhereInput;
}

export { MatchStartFindManyArgs };
