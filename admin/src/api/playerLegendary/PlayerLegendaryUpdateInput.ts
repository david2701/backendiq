import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerLegendaryUpdateInput = {
  name?: string | null;
  team?: TeamWhereUniqueInput | null;
};
