import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerCreateInput = {
  age?: string | null;
  birthday?: Date | null;
  name?: string | null;
  number?: string | null;
  team?: TeamWhereUniqueInput | null;
};
