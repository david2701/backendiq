import { MatchStartWhereUniqueInput } from "../matchStart/MatchStartWhereUniqueInput";

export type MyTeamWhereInput = {
  createdAt?: Date;
  id?: string;
  idMatch?: MatchStartWhereUniqueInput | null;
  scoreTotal?: string | null;
  updatedAt?: Date;
};
