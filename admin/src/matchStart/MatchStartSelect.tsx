import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { MatchStart as TMatchStart } from "../api/matchStart/MatchStart";

type Data = TMatchStart[];

type Props = Omit<SelectFieldProps, "options">;

export const MatchStartSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/match-starts",
    async () => {
      const response = await api.get("/api/match-starts");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.awayScore && item.awayScore.length ? item.awayScore : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
