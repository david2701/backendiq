import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerWhereInput } from "./PlayerWhereInput";

@ArgsType()
class PlayerFindManyArgs {
  @Field(() => PlayerWhereInput, { nullable: true })
  where?: PlayerWhereInput;
}

export { PlayerFindManyArgs };
