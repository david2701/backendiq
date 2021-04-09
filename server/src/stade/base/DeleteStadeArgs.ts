import { ArgsType, Field } from "@nestjs/graphql";
import { StadeWhereUniqueInput } from "./StadeWhereUniqueInput";

@ArgsType()
class DeleteStadeArgs {
  @Field(() => StadeWhereUniqueInput, { nullable: false })
  where!: StadeWhereUniqueInput;
}

export { DeleteStadeArgs };
