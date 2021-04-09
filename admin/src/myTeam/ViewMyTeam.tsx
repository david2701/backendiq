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
import { MatchStartSelect } from "../matchStart/MatchStartSelect";
import { MyTeam as TMyTeam } from "../api/myTeam/MyTeam";
import { MyTeamUpdateInput } from "../api/myTeam/MyTeamUpdateInput";

export const ViewMyTeam = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/my-teams/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TMyTeam,
    AxiosError,
    [string, string]
  >(["get-/api/my-teams", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/my-teams"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TMyTeam, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/my-teams"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//my-teams");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TMyTeam, AxiosError, MyTeamUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/my-teams"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: MyTeamUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.scoreTotal);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["idMatch", "scoreTotal"]),
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
                title={`${"My_teams"} ${
                  data?.scoreTotal && data?.scoreTotal.length
                    ? data.scoreTotal
                    : data?.id
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
              <MatchStartSelect label="Id_Match" name="idMatch.id" />
            </div>
            <div>
              <TextField label="Score_Total" name="scoreTotal" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
