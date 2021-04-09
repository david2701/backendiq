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
import { TeamSelect } from "../team/TeamSelect";
import { PlayerLegendary as TPlayerLegendary } from "../api/playerLegendary/PlayerLegendary";
import { PlayerLegendaryUpdateInput } from "../api/playerLegendary/PlayerLegendaryUpdateInput";

export const ViewPlayerLegendary = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/player-legendaries/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TPlayerLegendary,
    AxiosError,
    [string, string]
  >(["get-/api/player-legendaries", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/player-legendaries"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TPlayerLegendary, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/player-legendaries"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//player-legendaries");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TPlayerLegendary, AxiosError, PlayerLegendaryUpdateInput>(
    async (data) => {
      const response = await api.patch(
        `${"/api/player-legendaries"}/${id}`,
        data
      );
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: PlayerLegendaryUpdateInput) => {
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

  const initialValues = React.useMemo(() => pick(data, ["name", "team"]), [
    data,
  ]);

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
                title={`${"Player_legendaries"} ${
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
              <TextField label="Name" name="name" />
            </div>
            <div>
              <TeamSelect label="Team" name="team.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
