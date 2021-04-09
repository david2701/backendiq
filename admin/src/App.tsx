import React, { useCallback, useContext } from "react";
import { Route, Switch, useHistory, Link, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { Credentials, setCredentials, removeCredentials } from "./auth";
import {
  Menu,
  MainLayout,
  Page,
  CircleBadge,
  Breadcrumbs,
} from "@amplication/design-system";
import BreadcrumbsContext from "./components/breadcrumbs/BreadcrumbsContext";
import BreadcrumbsProvider from "./components/breadcrumbs/BreadcrumbsProvider";
import useBreadcrumbs from "./components/breadcrumbs/use-breadcrumbs";
import PrivateRoute from "./components/PrivateRoute";
import { UserIndex } from "./user/UserIndex";
import { TeamIndex } from "./team/TeamIndex";
import { CountryIndex } from "./country/CountryIndex";
import { GoalkeeperIndex } from "./goalkeeper/GoalkeeperIndex";
import { PlayerIndex } from "./player/PlayerIndex";
import { StadeIndex } from "./stade/StadeIndex";
import { MatchStartIndex } from "./matchStart/MatchStartIndex";
import { MyTeamIndex } from "./myTeam/MyTeamIndex";
import { PlayerLegendaryIndex } from "./playerLegendary/PlayerLegendaryIndex";

const App = (): React.ReactElement => {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );

  return (
    <BreadcrumbsProvider>
      <MainLayout>
        <Switch>
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/" component={AppLayout} />
        </Switch>
      </MainLayout>
    </BreadcrumbsProvider>
  );
};

export default App;

/**@todo: move to a separate template file */
const AppLayout = (): React.ReactElement => {
  const history = useHistory();
  useBreadcrumbs("/", "Backend IQ");
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const signOut = useCallback(() => {
    removeCredentials();
    history.push("/login");
  }, [history]);

  // Use navLink for breadcrumbs to prevent page reload
  const ItemLink = ({ href, ...rest }: { href: string }) => (
    <NavLink {...rest} to={href} />
  );

  return (
    <>
      <Menu
        onSignOutClick={signOut}
        logoContent={
          <Link to="/">
            <CircleBadge name={"Backend IQ"} />
          </Link>
        }
      ></Menu>
      <MainLayout.Content>
        <Breadcrumbs>
          {}
          {breadcrumbsContext.breadcrumbsItems.map((item, index, items) => (
            <Breadcrumbs.Item
              as={ItemLink}
              key={index}
              selected={index + 1 === items.length}
              href={item.url}
            >
              {item.name}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Page>
          <Switch>
            <PrivateRoute exact path="/" component={Navigation} />
            <PrivateRoute path="/users" component={UserIndex} />
            <PrivateRoute path="/teams" component={TeamIndex} />
            <PrivateRoute path="/countries" component={CountryIndex} />
            <PrivateRoute path="/goalkeepers" component={GoalkeeperIndex} />
            <PrivateRoute path="/players" component={PlayerIndex} />
            <PrivateRoute path="/stades" component={StadeIndex} />
            <PrivateRoute path="/match-starts" component={MatchStartIndex} />
            <PrivateRoute path="/my-teams" component={MyTeamIndex} />
            <PrivateRoute
              path="/player-legendaries"
              component={PlayerLegendaryIndex}
            />
          </Switch>
        </Page>
      </MainLayout.Content>
    </>
  );
};
