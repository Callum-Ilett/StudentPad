import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = {
  palette: {
    type: "light",

    primary: {
      main: "#243249",
    },
    secondary: {
      main: "#ff5a5e",
    },

    background: {
      default: "#f7f7f7",
    },
    text: {
      primary: "#484848",
    },
  },

  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),

    button: {
      textTransform: "none",
    },
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
        },
      },
    },
  },
};

const theme = createMuiTheme(lightTheme);

export default theme;
