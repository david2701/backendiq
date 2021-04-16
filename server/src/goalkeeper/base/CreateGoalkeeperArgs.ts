import { ArgsType, Field } from "@nestjs/graphql";
import { GoalkeeperCreateInput } from "./GoalkeeperCreateInput";

@ArgsType()
class CreateGoalkeeperArgs {
  @Field(() => GoalkeeperCreateInput, { nullable: false })
  data!: GoalkeeperCreateInput;
}

export { CreateGoalkeeperArgs };
