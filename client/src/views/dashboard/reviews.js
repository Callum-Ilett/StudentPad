import React from "react";
import { styled } from "@material-ui/core/styles";
import { Sidebar } from "../../components";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default function Reviews() {
  return (
    <>
      <Sidebar />
      <Main>
        <Container>
          <Card variant="outlined">
            <CardContent>
              <Review />
              <Review />
            </CardContent>
          </Card>
        </Container>
      </Main>
    </>
  );
}

function Review() {
  return (
    <>
      <Box display="flex" my={2}>
        <Avatar src="https://img.gs/vvjnmlqfld/1200/www.accommodationforstudents.com/images/properties/lphs_3398_additional13012020110151.jpg" />
        <Box ml={2}>
          <Typography>Name left a review on 2 Bedroom House</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="textSecondary">
              November 10, 2020
            </Typography>
            <Rating defaultValue={4.5} precision={0.5} size="small" readOnly />
          </Box>
        </Box>
      </Box>
      <Typography variant="body2">
        The second bedroom is a corner room with double windows. The kitchen has
        fabulous space, new appliances, and a laundry area. Other features
        include rich detailed floors
      </Typography>

      <Box my={1}>
        <Divider />
      </Box>
    </>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});
