import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { TeamTitle } from "../team/TeamTitle";
import { Goalkeeper as TGoalkeeper } from "../api/goalkeeper/Goalkeeper";

type Data = TGoalkeeper[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "age",
    title: "Age",
    sortable: false,
  },
  {
    name: "birthday",
    title: "Birthday",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "name",
    title: "Name",
    sortable: false,
  },
  {
    name: "number",
    title: "Number",
    sortable: false,
  },
  {
    name: "positionGoalkeeper",
    title: "Position_Goalkeeper",
    sortable: false,
  },
  {
    name: "team",
    title: "Team",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const GoalkeeperList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/goalkeepers",
    async () => {
      const response = await api.get("/api/goalkeepers");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Goalkeepers"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/goalkeepers/new"}>
            <Button>Create Goalkeeper </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TGoalkeeper) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/goalkeepers"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.age}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.birthday}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.name}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.number}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.positionGoalkeeper}</>
                </DataGridCell>
                <DataGridCell>
                  <TeamTitle id={item.team?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
