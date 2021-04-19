import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CountryList } from "./CountryList";
import { CreateCountry } from "./CreateCountry";
import { ViewCountry } from "./ViewCountry";

export const CountryIndex = (): React.ReactElement => {
  useBreadcrumbs("/countries/", "Countries");

  return (
    <Switch>
      <PrivateRoute exact path={"/countries/"} component={CountryList} />
      <PrivateRoute path={"/countries/new"} component={CreateCountry} />
      <PrivateRoute path={"/countries/:id"} component={ViewCountry} />
    </Switch>
  );
};
