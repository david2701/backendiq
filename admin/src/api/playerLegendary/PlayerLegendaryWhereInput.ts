import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerLegendaryWhereInput = {
  createdAt?: Date;
  id?: string;
  name?: string | null;
  team?: TeamWhereUniqueInput | null;
  updatedAt?: Date;
};
