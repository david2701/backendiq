import { ArgsType, Field } from "@nestjs/graphql";
import { TeamWhereInput } from "./TeamWhereInput";

@ArgsType()
class TeamFindManyArgs {
  @Field(() => TeamWhereInput, { nullable: true })
  where?: TeamWhereInput;
}

export { TeamFindManyArgs };
