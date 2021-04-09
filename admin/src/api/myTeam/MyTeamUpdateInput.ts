import { MatchStartWhereUniqueInput } from "../matchStart/MatchStartWhereUniqueInput";

export type MyTeamUpdateInput = {
  idMatch?: MatchStartWhereUniqueInput | null;
  scoreTotal?: string | null;
};
