import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Stade as TStade } from "../api/stade/Stade";

type Props = { id: string };

export const StadeTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TStade,
    AxiosError,
    [string, string]
  >(["get-/api/stades", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/stades"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/stades"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
