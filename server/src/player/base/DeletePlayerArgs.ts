import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerWhereUniqueInput } from "./PlayerWhereUniqueInput";

@ArgsType()
class DeletePlayerArgs {
  @Field(() => PlayerWhereUniqueInput, { nullable: false })
  where!: PlayerWhereUniqueInput;
}

export { DeletePlayerArgs };
