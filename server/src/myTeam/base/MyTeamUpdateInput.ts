import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MatchStartWhereUniqueInput } from "../../matchStart/base/MatchStartWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class MyTeamUpdateInput {
  @ApiProperty({
    required: false,
    type: MatchStartWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MatchStartWhereUniqueInput)
  @IsOptional()
  @Field(() => MatchStartWhereUniqueInput, {
    nullable: true,
  })
  idMatch?: MatchStartWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  scoreTotal?: string | null;
}
export { MyTeamUpdateInput };
