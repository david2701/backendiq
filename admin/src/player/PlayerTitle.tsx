import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Player as TPlayer } from "../api/player/Player";

type Props = { id: string };

export const PlayerTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TPlayer,
    AxiosError,
    [string, string]
  >(["get-/api/players", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/players"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/players"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
