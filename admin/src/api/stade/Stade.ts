import { CountryWhereUniqueInput } from "../country/CountryWhereUniqueInput";

export type Stade = {
  country?: CountryWhereUniqueInput | null;
  createdAt: Date;
  id: string;
  name: string | null;
  updatedAt: Date;
};
