import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerLegendary = {
  createdAt: Date;
  id: string;
  name: string | null;
  team?: TeamWhereUniqueInput | null;
  updatedAt: Date;
};
