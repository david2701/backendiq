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
import { MatchStartSelect } from "../matchStart/MatchStartSelect";
import { MyTeam as TMyTeam } from "../api/myTeam/MyTeam";
import { MyTeamCreateInput } from "../api/myTeam/MyTeamCreateInput";

const INITIAL_VALUES = {} as MyTeamCreateInput;

export const CreateMyTeam = (): React.ReactElement => {
  useBreadcrumbs("/my-teams/new", "Create My_teams");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TMyTeam,
    AxiosError,
    MyTeamCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/my-teams", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/my-teams"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: MyTeamCreateInput) => {
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
            <FormHeader title={"Create My_teams"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
