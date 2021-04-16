import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryCreateInput } from "./PlayerLegendaryCreateInput";

@ArgsType()
class CreatePlayerLegendaryArgs {
  @Field(() => PlayerLegendaryCreateInput, { nullable: false })
  data!: PlayerLegendaryCreateInput;
}

export { CreatePlayerLegendaryArgs };
