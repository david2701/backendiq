import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { MatchStartList } from "./MatchStartList";
import { CreateMatchStart } from "./CreateMatchStart";
import { ViewMatchStart } from "./ViewMatchStart";

export const MatchStartIndex = (): React.ReactElement => {
  useBreadcrumbs("/match-starts/", "Match_Starts");

  return (
    <Switch>
      <PrivateRoute exact path={"/match-starts/"} component={MatchStartList} />
      <PrivateRoute path={"/match-starts/new"} component={CreateMatchStart} />
      <PrivateRoute path={"/match-starts/:id"} component={ViewMatchStart} />
    </Switch>
  );
};
