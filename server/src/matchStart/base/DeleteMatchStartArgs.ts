import { ArgsType, Field } from "@nestjs/graphql";
import { MatchStartWhereUniqueInput } from "./MatchStartWhereUniqueInput";

@ArgsType()
class DeleteMatchStartArgs {
  @Field(() => MatchStartWhereUniqueInput, { nullable: false })
  where!: MatchStartWhereUniqueInput;
}

export { DeleteMatchStartArgs };
