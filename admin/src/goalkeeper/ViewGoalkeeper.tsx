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
import { Goalkeeper as TGoalkeeper } from "../api/goalkeeper/Goalkeeper";
import { GoalkeeperUpdateInput } from "../api/goalkeeper/GoalkeeperUpdateInput";

export const ViewGoalkeeper = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/goalkeepers/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TGoalkeeper,
    AxiosError,
    [string, string]
  >(["get-/api/goalkeepers", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/goalkeepers"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TGoalkeeper, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/goalkeepers"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//goalkeepers");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TGoalkeeper, AxiosError, GoalkeeperUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/goalkeepers"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: GoalkeeperUpdateInput) => {
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
        "age",
        "birthday",
        "name",
        "number",
        "positionGoalkeeper",
        "team",
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
                title={`${"Goalkeeper"} ${
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
              <TextField type="number" step={1} label="Age" name="age" />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="Birthday"
                name="birthday"
              />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
            <div>
              <TextField type="number" step={1} label="Number" name="number" />
            </div>
            <div>
              <TextField
                type="number"
                step={1}
                label="Position_Goalkeeper"
                name="positionGoalkeeper"
              />
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
