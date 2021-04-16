import { ArgsType, Field } from "@nestjs/graphql";
import { PlayerCreateInput } from "./PlayerCreateInput";

@ArgsType()
class CreatePlayerArgs {
  @Field(() => PlayerCreateInput, { nullable: false })
  data!: PlayerCreateInput;
}

export { CreatePlayerArgs };
