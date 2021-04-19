import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GoalkeeperList } from "./GoalkeeperList";
import { CreateGoalkeeper } from "./CreateGoalkeeper";
import { ViewGoalkeeper } from "./ViewGoalkeeper";

export const GoalkeeperIndex = (): React.ReactElement => {
  useBreadcrumbs("/goalkeepers/", "Goalkeepers");

  return (
    <Switch>
      <PrivateRoute exact path={"/goalkeepers/"} component={GoalkeeperList} />
      <PrivateRoute path={"/goalkeepers/new"} component={CreateGoalkeeper} />
      <PrivateRoute path={"/goalkeepers/:id"} component={ViewGoalkeeper} />
    </Switch>
  );
};
