import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PlayerList } from "./PlayerList";
import { CreatePlayer } from "./CreatePlayer";
import { ViewPlayer } from "./ViewPlayer";

export const PlayerIndex = (): React.ReactElement => {
  useBreadcrumbs("/players/", "Players");

  return (
    <Switch>
      <PrivateRoute exact path={"/players/"} component={PlayerList} />
      <PrivateRoute path={"/players/new"} component={CreatePlayer} />
      <PrivateRoute path={"/players/:id"} component={ViewPlayer} />
    </Switch>
  );
};
