import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PlayerLegendaryList } from "./PlayerLegendaryList";
import { CreatePlayerLegendary } from "./CreatePlayerLegendary";
import { ViewPlayerLegendary } from "./ViewPlayerLegendary";

export const PlayerLegendaryIndex = (): React.ReactElement => {
  useBreadcrumbs("/player-legendaries/", "Player_legendaries");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/player-legendaries/"}
        component={PlayerLegendaryList}
      />
      <PrivateRoute
        path={"/player-legendaries/new"}
        component={CreatePlayerLegendary}
      />
      <PrivateRoute
        path={"/player-legendaries/:id"}
        component={ViewPlayerLegendary}
      />
    </Switch>
  );
};
