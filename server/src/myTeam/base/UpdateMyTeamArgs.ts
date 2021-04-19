import { ArgsType, Field } from "@nestjs/graphql";
import { MyTeamWhereUniqueInput } from "./MyTeamWhereUniqueInput";
import { MyTeamUpdateInput } from "./MyTeamUpdateInput";

@ArgsType()
class UpdateMyTeamArgs {
  @Field(() => MyTeamWhereUniqueInput, { nullable: false })
  where!: MyTeamWhereUniqueInput;
  @Field(() => MyTeamUpdateInput, { nullable: false })
  data!: MyTeamUpdateInput;
}

export { UpdateMyTeamArgs };
