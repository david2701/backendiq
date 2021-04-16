import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerWhereInput = {
  age?: string | null;
  birthday?: Date | null;
  createdAt?: Date;
  id?: string;
  name?: string | null;
  number?: string | null;
  team?: TeamWhereUniqueInput | null;
  updatedAt?: Date;
};
