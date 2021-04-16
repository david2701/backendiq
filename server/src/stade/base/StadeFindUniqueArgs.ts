import { ArgsType, Field } from "@nestjs/graphql";
import { StadeWhereUniqueInput } from "./StadeWhereUniqueInput";

@ArgsType()
class StadeFindUniqueArgs {
  @Field(() => StadeWhereUniqueInput, { nullable: false })
  where!: StadeWhereUniqueInput;
}

export { StadeFindUniqueArgs };
