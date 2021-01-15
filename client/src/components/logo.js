import React from "react";
import { styled } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useStateValue } from "../redux/state-provider";
import { useHistory } from "react-router-dom";

export default function Logo({ textColour }) {
  const [{ navbarOpen }, dispatch] = useStateValue();
  const history = useHistory();

  const goToHomePage = () => {
    navbarOpen && dispatch({ type: "SET_NAVBAR_OPEN", open: false });
    history.push("/");
  };

  return (
    <CompanyLogo color={textColour} onClick={goToHomePage} variant="h6">
      StudentPad
    </CompanyLogo>
  );
}

const CompanyLogo = styled(Typography)(({ theme, color }) => ({
  color: `${color}`,
  textTransform: "uppercase",
  fontWeight: theme.typography.fontWeightBold,
}));
