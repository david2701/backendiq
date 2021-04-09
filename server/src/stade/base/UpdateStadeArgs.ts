import { ArgsType, Field } from "@nestjs/graphql";
import { StadeWhereUniqueInput } from "./StadeWhereUniqueInput";
import { StadeUpdateInput } from "./StadeUpdateInput";

@ArgsType()
class UpdateStadeArgs {
  @Field(() => StadeWhereUniqueInput, { nullable: false })
  where!: StadeWhereUniqueInput;
  @Field(() => StadeUpdateInput, { nullable: false })
  data!: StadeUpdateInput;
}

export { UpdateStadeArgs };
