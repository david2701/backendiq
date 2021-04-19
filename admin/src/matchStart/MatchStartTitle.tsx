import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { MatchStart as TMatchStart } from "../api/matchStart/MatchStart";

type Props = { id: string };

export const MatchStartTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TMatchStart,
    AxiosError,
    [string, string]
  >(["get-/api/match-starts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/match-starts"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/match-starts"}/${id}`} className="entity-id">
      {data?.awayScore && data?.awayScore.length ? data.awayScore : data?.id}
    </Link>
  );
};
