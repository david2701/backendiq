import { MatchStartWhereUniqueInput } from "../matchStart/MatchStartWhereUniqueInput";

export type MyTeamCreateInput = {
  idMatch?: MatchStartWhereUniqueInput | null;
  scoreTotal?: string | null;
};
