import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import RouteWithSubRoutes from "./sub-routes";
import { routes } from "./config";
import { Navbar } from "../components";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {routes &&
          routes.map((route) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
