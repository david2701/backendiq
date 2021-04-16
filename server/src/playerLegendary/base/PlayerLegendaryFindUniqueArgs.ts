import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryWhereUniqueInput } from "./PlayerLegendaryWhereUniqueInput";

@ArgsType()
class PlayerLegendaryFindUniqueArgs {
  @Field(() => PlayerLegendaryWhereUniqueInput, { nullable: false })
  where!: PlayerLegendaryWhereUniqueInput;
}

export { PlayerLegendaryFindUniqueArgs };
