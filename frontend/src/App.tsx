import React, { useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Error from "./pages/error/Error";
import SignIn from "./pages/signin/SignIn";
import Layout from "./components/Layout/layout";
import store from "./store/store";

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem("user"));

  store.subscribe(() => {
    setAuthenticated(!!localStorage.getItem("user"));
  });

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/itm/dashboard" />} />
        <Route exact path="/itm" render={() => <Redirect to="/itm/dashboard" />} />
        <PrivateRoute path="/itm" component={Layout} />
        <PublicRoute path="/login" component={SignIn} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
