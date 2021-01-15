import React from "react";

import theme from "./config/theme";
import { CssBaseline } from "@material-ui/core";
import { StateProvider } from "./redux/state-provider";
import reducer, { initialState } from "./redux/reducer";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import Router from "./router";

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Router />
      </MuiThemeProvider>
    </StateProvider>
  );
}
