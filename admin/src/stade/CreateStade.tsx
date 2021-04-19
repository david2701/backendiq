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
import { Stade as TStade } from "../api/stade/Stade";
import { StadeCreateInput } from "../api/stade/StadeCreateInput";

const INITIAL_VALUES = {} as StadeCreateInput;

export const CreateStade = (): React.ReactElement => {
  useBreadcrumbs("/stades/new", "Create Stade");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TStade,
    AxiosError,
    StadeCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/stades", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/stades"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StadeCreateInput) => {
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
            <FormHeader title={"Create Stade"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <CountrySelect label="Country" name="country.id" />
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
