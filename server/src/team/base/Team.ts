import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested, IsDate } from "class-validator";
import { CountryWhereUniqueInput } from "../../country/base/CountryWhereUniqueInput";
import { Type } from "class-transformer";
import { MatchStartWhereUniqueInput } from "../../matchStart/base/MatchStartWhereUniqueInput";
@ObjectType()
class Team {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  colorA!: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  colorB!: string | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  colorC!: string;
  @ApiProperty({
    required: false,
    type: CountryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CountryWhereUniqueInput)
  @IsOptional()
  country?: CountryWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  logo!: string;
  @ApiProperty({
    required: false,
    type: MatchStartWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MatchStartWhereUniqueInput)
  @IsOptional()
  matchStart?: MatchStartWhereUniqueInput | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Team };
