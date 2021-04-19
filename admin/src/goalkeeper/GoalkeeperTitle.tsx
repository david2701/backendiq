import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Goalkeeper as TGoalkeeper } from "../api/goalkeeper/Goalkeeper";

type Props = { id: string };

export const GoalkeeperTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TGoalkeeper,
    AxiosError,
    [string, string]
  >(["get-/api/goalkeepers", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/goalkeepers"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/goalkeepers"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
