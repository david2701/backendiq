import { ArgsType, Field } from "@nestjs/graphql";
import { CountryWhereInput } from "./CountryWhereInput";

@ArgsType()
class CountryFindManyArgs {
  @Field(() => CountryWhereInput, { nullable: true })
  where?: CountryWhereInput;
}

export { CountryFindManyArgs };
