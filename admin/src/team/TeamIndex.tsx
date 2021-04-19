import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TeamList } from "./TeamList";
import { CreateTeam } from "./CreateTeam";
import { ViewTeam } from "./ViewTeam";

export const TeamIndex = (): React.ReactElement => {
  useBreadcrumbs("/teams/", "Teams");

  return (
    <Switch>
      <PrivateRoute exact path={"/teams/"} component={TeamList} />
      <PrivateRoute path={"/teams/new"} component={CreateTeam} />
      <PrivateRoute path={"/teams/:id"} component={ViewTeam} />
    </Switch>
  );
};
