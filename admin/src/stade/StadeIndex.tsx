import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StadeList } from "./StadeList";
import { CreateStade } from "./CreateStade";
import { ViewStade } from "./ViewStade";

export const StadeIndex = (): React.ReactElement => {
  useBreadcrumbs("/stades/", "Stades");

  return (
    <Switch>
      <PrivateRoute exact path={"/stades/"} component={StadeList} />
      <PrivateRoute path={"/stades/new"} component={CreateStade} />
      <PrivateRoute path={"/stades/:id"} component={ViewStade} />
    </Switch>
  );
};
