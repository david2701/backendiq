import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Country as TCountry } from "../api/country/Country";

type Props = { id: string };

export const CountryTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TCountry,
    AxiosError,
    [string, string]
  >(["get-/api/countries", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/countries"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/countries"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
