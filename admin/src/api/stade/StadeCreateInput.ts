import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type StadeCreateInput = {
  country?: CountryWhereUniqueInput | null;
  name?: string | null;
};
