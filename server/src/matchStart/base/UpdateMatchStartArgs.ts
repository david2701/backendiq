import { ArgsType, Field } from "@nestjs/graphql";
import { MatchStartWhereUniqueInput } from "./MatchStartWhereUniqueInput";
import { MatchStartUpdateInput } from "./MatchStartUpdateInput";

@ArgsType()
class UpdateMatchStartArgs {
  @Field(() => MatchStartWhereUniqueInput, { nullable: false })
  where!: MatchStartWhereUniqueInput;
  @Field(() => MatchStartUpdateInput, { nullable: false })
  data!: MatchStartUpdateInput;
}

export { UpdateMatchStartArgs };
