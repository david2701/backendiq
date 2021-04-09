import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { MatchStartWhereUniqueInput } from "../matchStart/MatchStartWhereUniqueInput";

export type TeamWhereInput = {
  colorA?: string | null;
  colorB?: string | null;
  colorC?: string;
  country?: CountryWhereUniqueInput | null;
  createdAt?: Date;
  id?: string;
  logo?: string;
  matchStart?: MatchStartWhereUniqueInput | null;
  name?: string;
  updatedAt?: Date;
};
