import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { MatchStart as TMatchStart } from "../api/matchStart/MatchStart";
import { MatchStartCreateInput } from "../api/matchStart/MatchStartCreateInput";

const INITIAL_VALUES = {} as MatchStartCreateInput;

export const CreateMatchStart = (): React.ReactElement => {
  useBreadcrumbs("/match-starts/new", "Create Match_Start");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TMatchStart,
    AxiosError,
    MatchStartCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/match-starts", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/match-starts"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: MatchStartCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Match_Start"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
