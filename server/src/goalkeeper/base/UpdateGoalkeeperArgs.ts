import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperWhereUniqueInput } from "./GoalkeeperWhereUniqueInput";
import { GoalkeeperUpdateInput } from "./GoalkeeperUpdateInput";

@ArgsType()
class UpdateGoalkeeperArgs {
  @Field(() => GoalkeeperWhereUniqueInput, { nullable: false })
  where!: GoalkeeperWhereUniqueInput;
  @Field(() => GoalkeeperUpdateInput, { nullable: false })
  data!: GoalkeeperUpdateInput;
}

export { UpdateGoalkeeperArgs };
