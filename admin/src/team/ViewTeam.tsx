import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CountrySelect } from "../country/CountrySelect";
import { MatchStartSelect } from "../matchStart/MatchStartSelect";
import { Team as TTeam } from "../api/team/Team";
import { TeamUpdateInput } from "../api/team/TeamUpdateInput";

export const ViewTeam = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/teams/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTeam,
    AxiosError,
    [string, string]
  >(["get-/api/teams", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/teams"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTeam, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/teams"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//teams");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTeam, AxiosError, TeamUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/teams"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: TeamUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "colorA",
        "colorB",
        "colorC",
        "country",
        "logo",
        "matchStart",
        "name",
      ]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Team"} ${
                  data?.name && data?.name.length ? data.name : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="ColorA" name="colorA" />
            </div>
            <div>
              <TextField label="ColorB" name="colorB" />
            </div>
            <div>
              <TextField label="ColorC" name="colorC" />
            </div>
            <div>
              <CountrySelect label="Country" name="country.id" />
            </div>
            <div>
              <TextField label="Logo" name="logo" />
            </div>
            <div>
              <MatchStartSelect label="Match_Start" name="matchStart.id" />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
