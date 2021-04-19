import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type StadeWhereInput = {
  country?: CountryWhereUniqueInput | null;
  createdAt?: Date;
  id?: string;
  name?: string | null;
  updatedAt?: Date;
};
