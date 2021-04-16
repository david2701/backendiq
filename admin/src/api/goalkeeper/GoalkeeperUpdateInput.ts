import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type GoalkeeperUpdateInput = {
  age?: number | null;
  birthday?: Date | null;
  name?: string | null;
  number?: number | null;
  positionGoalkeeper?: number | null;
  team?: TeamWhereUniqueInput | null;
};
