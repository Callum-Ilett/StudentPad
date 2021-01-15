import React from "react";
import { styled } from "@material-ui/core/styles";

function DividerWithText({ children }) {
  return (
    <DividerContainer>
      <Border />
      <Content>{children}</Content>
      <Border />
    </DividerContainer>
  );
}

const DividerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const Border = styled("div")({
  borderBottom: "2px solid lightgray",
  width: "100%",
});

const Content = styled("span")(({ theme }) => ({
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  fontWeight: 500,
  fontSize: 18,
  color: theme.palette.primary,
}));

export default DividerWithText;
