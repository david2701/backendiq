import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryWhereUniqueInput } from "./PlayerLegendaryWhereUniqueInput";

@ArgsType()
class DeletePlayerLegendaryArgs {
  @Field(() => PlayerLegendaryWhereUniqueInput, { nullable: false })
  where!: PlayerLegendaryWhereUniqueInput;
}

export { DeletePlayerLegendaryArgs };
