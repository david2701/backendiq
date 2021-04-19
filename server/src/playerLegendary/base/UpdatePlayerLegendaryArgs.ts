import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryWhereUniqueInput } from "./PlayerLegendaryWhereUniqueInput";
import { PlayerLegendaryUpdateInput } from "./PlayerLegendaryUpdateInput";

@ArgsType()
class UpdatePlayerLegendaryArgs {
  @Field(() => PlayerLegendaryWhereUniqueInput, { nullable: false })
  where!: PlayerLegendaryWhereUniqueInput;
  @Field(() => PlayerLegendaryUpdateInput, { nullable: false })
  data!: PlayerLegendaryUpdateInput;
}

export { UpdatePlayerLegendaryArgs };
