import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Stade as TStade } from "../api/stade/Stade";

type Data = TStade[];

type Props = Omit<SelectFieldProps, "options">;

export const StadeSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/stades",
    async () => {
      const response = await api.get("/api/stades");
      return response.data;
    }
  );

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
