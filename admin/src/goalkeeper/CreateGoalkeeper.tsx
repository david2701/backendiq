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
import { TeamSelect } from "../team/TeamSelect";
import { Goalkeeper as TGoalkeeper } from "../api/goalkeeper/Goalkeeper";
import { GoalkeeperCreateInput } from "../api/goalkeeper/GoalkeeperCreateInput";

const INITIAL_VALUES = {} as GoalkeeperCreateInput;

export const CreateGoalkeeper = (): React.ReactElement => {
  useBreadcrumbs("/goalkeepers/new", "Create Goalkeeper");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TGoalkeeper,
    AxiosError,
    GoalkeeperCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/goalkeepers", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/goalkeepers"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: GoalkeeperCreateInput) => {
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
            <FormHeader title={"Create Goalkeeper"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="number" step={1} label="Age" name="age" />
          </div>
          <div>
            <TextField type="datetime-local" label="Birthday" name="birthday" />
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
