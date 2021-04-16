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
import { Player as TPlayer } from "../api/player/Player";
import { PlayerCreateInput } from "../api/player/PlayerCreateInput";

const INITIAL_VALUES = {} as PlayerCreateInput;

export const CreatePlayer = (): React.ReactElement => {
  useBreadcrumbs("/players/new", "Create Player");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TPlayer,
    AxiosError,
    PlayerCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/players", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/players"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PlayerCreateInput) => {
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
            <FormHeader title={"Create Player"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Age" name="age" />
          </div>
          <div>
            <TextField type="datetime-local" label="Birthday" name="birthday" />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <TextField label="Number" name="number" />
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
