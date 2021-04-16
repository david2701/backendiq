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
import { Country as TCountry } from "../api/country/Country";
import { CountryCreateInput } from "../api/country/CountryCreateInput";

const INITIAL_VALUES = {} as CountryCreateInput;

export const CreateCountry = (): React.ReactElement => {
  useBreadcrumbs("/countries/new", "Create Countries");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TCountry,
    AxiosError,
    CountryCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/countries", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/countries"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CountryCreateInput) => {
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
            <FormHeader title={"Create Countries"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
