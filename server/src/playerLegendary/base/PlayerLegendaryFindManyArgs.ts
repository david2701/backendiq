import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerLegendaryWhereInput } from "./PlayerLegendaryWhereInput";

@ArgsType()
class PlayerLegendaryFindManyArgs {
  @Field(() => PlayerLegendaryWhereInput, { nullable: true })
  where?: PlayerLegendaryWhereInput;
}

export { PlayerLegendaryFindManyArgs };
