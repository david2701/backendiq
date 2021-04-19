import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Teams" to="/teams" />
      <NavigationItem name="Countries" to="/countries" />
      <NavigationItem name="Goalkeepers" to="/goalkeepers" />
      <NavigationItem name="Players" to="/players" />
      <NavigationItem name="Stades" to="/stades" />
      <NavigationItem name="Match_Starts" to="/match-starts" />
      <NavigationItem name="My_teams" to="/my-teams" />
      <NavigationItem name="Player_legendaries" to="/player-legendaries" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
