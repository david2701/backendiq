import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { PlayerLegendary as TPlayerLegendary } from "../api/playerLegendary/PlayerLegendary";

type Props = { id: string };

export const PlayerLegendaryTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TPlayerLegendary,
    AxiosError,
    [string, string]
  >(["get-/api/player-legendaries", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/player-legendaries"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/player-legendaries"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
