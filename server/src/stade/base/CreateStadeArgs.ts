import { ArgsType, Field } from "@nestjs/graphql";
import { StadeCreateInput } from "./StadeCreateInput";

@ArgsType()
class CreateStadeArgs {
  @Field(() => StadeCreateInput, { nullable: false })
  data!: StadeCreateInput;
}

export { CreateStadeArgs };
