import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerUpdateInput = {
  age?: string | null;
  birthday?: Date | null;
  name?: string | null;
  number?: string | null;
  team?: TeamWhereUniqueInput | null;
};
