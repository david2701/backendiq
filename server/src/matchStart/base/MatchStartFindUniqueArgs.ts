import { ArgsType, Field } from "@nestjs/graphql";
import { MatchStartWhereUniqueInput } from "./MatchStartWhereUniqueInput";

@ArgsType()
class MatchStartFindUniqueArgs {
  @Field(() => MatchStartWhereUniqueInput, { nullable: false })
  where!: MatchStartWhereUniqueInput;
}

export { MatchStartFindUniqueArgs };
