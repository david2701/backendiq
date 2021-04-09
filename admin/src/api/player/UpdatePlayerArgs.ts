import { PlayerWhereUniqueInput } from "./PlayerWhereUniqueInput";
import { PlayerUpdateInput } from "./PlayerUpdateInput";

export type UpdatePlayerArgs = {
  where: PlayerWhereUniqueInput;
  data: PlayerUpdateInput;
};
