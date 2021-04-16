import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";
import { MatchStartWhereUniqueInput } from "../matchStart/MatchStartWhereUniqueInput";

export type TeamCreateInput = {
  colorA?: string | null;
  colorB?: string | null;
  colorC: string;
  country?: CountryWhereUniqueInput | null;
  logo: string;
  matchStart?: MatchStartWhereUniqueInput | null;
  name: string;
};
