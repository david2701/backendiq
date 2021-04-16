import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Team as TTeam } from "../api/team/Team";

type Data = TTeam[];

type Props = Omit<SelectFieldProps, "options">;

export const TeamSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/teams", async () => {
    const response = await api.get("/api/teams");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
