import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";

@ArgsType()
class DeleteGoalkeeperArgs {
  @Field(() => GoalkeeperWhereUniqueInput, { nullable: false })
  where!: GoalkeeperWhereUniqueInput;
}

export { DeleteGoalkeeperArgs };
