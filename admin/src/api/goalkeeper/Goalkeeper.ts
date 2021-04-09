import { TeamWhereUniqueInput } from "../team/TeamWhereUniqueInput";

export type Goalkeeper = {
  age: number | null;
  birthday: Date | null;
  createdAt: Date;
  id: string;
  name: string | null;
  number: number | null;
  positionGoalkeeper: number | null;
  team?: TeamWhereUniqueInput | null;
  updatedAt: Date;
};
