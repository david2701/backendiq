import { ArgsType, Field } from "@nestjs/graphql";
import { StadeWhereInput } from "./StadeWhereInput";

@ArgsType()
class StadeFindManyArgs {
  @Field(() => StadeWhereInput, { nullable: true })
  where?: StadeWhereInput;
}

export { StadeFindManyArgs };
