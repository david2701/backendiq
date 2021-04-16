import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperWhereInput } from "./GoalkeeperWhereInput";

@ArgsType()
class GoalkeeperFindManyArgs {
  @Field(() => GoalkeeperWhereInput, { nullable: true })
  where?: GoalkeeperWhereInput;
}

export { GoalkeeperFindManyArgs };
