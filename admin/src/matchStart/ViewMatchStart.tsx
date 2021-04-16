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
import { MatchStart as TMatchStart } from "../api/matchStart/MatchStart";
import { MatchStartUpdateInput } from "../api/matchStart/MatchStartUpdateInput";

export const ViewMatchStart = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/match-starts/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TMatchStart,
    AxiosError,
    [string, string]
  >(["get-/api/match-starts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/match-starts"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TMatchStart, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/match-starts"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//match-starts");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TMatchStart, AxiosError, MatchStartUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/match-starts"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: MatchStartUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.awayScore);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["awayScore", "date", "homeScore"]),
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
                title={`${"Match_Start"} ${
                  data?.awayScore && data?.awayScore.length
                    ? data.awayScore
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
              <TextField label="Away_score" name="awayScore" />
            </div>
            <div>
              <TextField type="datetime-local" label="Date" name="date" />
            </div>
            <div>
              <TextField label="Home_score" name="homeScore" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
