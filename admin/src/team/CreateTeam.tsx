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
import { CountrySelect } from "../country/CountrySelect";
import { MatchStartSelect } from "../matchStart/MatchStartSelect";
import { Team as TTeam } from "../api/team/Team";
import { TeamCreateInput } from "../api/team/TeamCreateInput";

const INITIAL_VALUES = {} as TeamCreateInput;

export const CreateTeam = (): React.ReactElement => {
  useBreadcrumbs("/teams/new", "Create Team");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TTeam,
    AxiosError,
    TeamCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/teams", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/teams"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TeamCreateInput) => {
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
            <FormHeader title={"Create Team"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
