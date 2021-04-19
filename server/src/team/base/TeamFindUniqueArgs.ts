import { ArgsType, Field } from "@nestjs/graphql";
import { TeamWhereUniqueInput } from "./TeamWhereUniqueInput";

@ArgsType()
class TeamFindUniqueArgs {
  @Field(() => TeamWhereUniqueInput, { nullable: false })
  where!: TeamWhereUniqueInput;
}

export { TeamFindUniqueArgs };
