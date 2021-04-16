import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type PlayerLegendaryCreateInput = {
  name?: string | null;
  team?: TeamWhereUniqueInput | null;
};
