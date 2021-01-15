import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "../redux/state-provider";

const RouteWithSubRoutes = (route) => {
  const [{ isAuthenticated }] = useStateValue();

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            isAuthenticated ? (
              route.component && (
                <route.component {...props} routes={route.routes} />
              )
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            route.component && (
              <route.component {...props} routes={route.routes} />
            )
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
