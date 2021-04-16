import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { MyTeam as TMyTeam } from "../api/myTeam/MyTeam";

type Props = { id: string };

export const MyTeamTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TMyTeam,
    AxiosError,
    [string, string]
  >(["get-/api/my-teams", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/my-teams"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/my-teams"}/${id}`} className="entity-id">
      {data?.scoreTotal && data?.scoreTotal.length ? data.scoreTotal : data?.id}
    </Link>
  );
};
