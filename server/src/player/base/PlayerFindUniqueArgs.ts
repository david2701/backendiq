import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerWhereUniqueInput } from "./PlayerWhereUniqueInput";

@ArgsType()
class PlayerFindUniqueArgs {
  @Field(() => PlayerWhereUniqueInput, { nullable: false })
  where!: PlayerWhereUniqueInput;
}

export { PlayerFindUniqueArgs };
