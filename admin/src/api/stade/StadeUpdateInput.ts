import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type StadeUpdateInput = {
  country?: CountryWhereUniqueInput | null;
  name?: string | null;
};
