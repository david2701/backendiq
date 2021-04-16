import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";

@ArgsType()
class GoalkeeperFindUniqueArgs {
  @Field(() => GoalkeeperWhereUniqueInput, { nullable: false })
  where!: GoalkeeperWhereUniqueInput;
}

export { GoalkeeperFindUniqueArgs };
