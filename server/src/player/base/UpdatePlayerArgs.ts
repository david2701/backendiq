import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerWhereUniqueInput } from "./PlayerWhereUniqueInput";
import { PlayerUpdateInput } from "./PlayerUpdateInput";

@ArgsType()
class UpdatePlayerArgs {
  @Field(() => PlayerWhereUniqueInput, { nullable: false })
  where!: PlayerWhereUniqueInput;
  @Field(() => PlayerUpdateInput, { nullable: false })
  data!: PlayerUpdateInput;
}

export { UpdatePlayerArgs };
