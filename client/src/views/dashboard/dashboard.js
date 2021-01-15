import React, { useEffect, useState } from "react";
import { styled } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import {
  AddOutlined,
  ChatOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  StarBorderOutlined,
} from "@material-ui/icons";

import FavouriteService from "../../services/favourites";
import ReviewService from "../../services/reviews";
import { useStateValue } from "../../redux/state-provider";

export default function Dashboard() {
  const [favourites, setFavourites] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [{ user }] = useStateValue();

  useEffect(() => {
    FavouriteService.GetAllFavourites(user._id).then(({ data }) => {
      setFavourites(data.favourites);
    });

    ReviewService.GetUsersReviews(user._id).then(({ data }) =>
      setReviews(data)
    );
  }, [user]);

  const panels = [
    {
      icon: <FavoriteBorderOutlined />,
      text: "Favourites",
      status: favourites ? favourites.length : 0,
      background: "#ff5a5e",
    },
    {
      icon: <StarBorderOutlined />,
      text: "Reviews",
      status: reviews ? reviews.length : 0,
      background: "#FFB423",
    },
    {
      icon: <ChatOutlined />,
      text: "Messages",
      status: Math.floor(Math.random() * 10) + 1,
      background: "#007BFB",
    },
    {
      icon: <HomeOutlined />,
      text: "Recommended",
      background: "#7266ba",
    },
  ];

  return (
    <Box>
      <Sidebar />
      <Main>
        <Container>
          <Grid container spacing={2}>
            {panels.map((panel, index) => {
              return (
                <Grid item md={3} xs={6} key={index}>
                  <Link
                    to={
                      "/dashboard/" +
                      panel.text.split(" ").join("-").toLowerCase()
                    }
                  >
                    <Panel background={panel.background}>
                      <PanelIcon>{panel.icon}</PanelIcon>
                      <PanelText variant="body2">
                        {panel.status} {panel.text}
                      </PanelText>
                    </Panel>
                  </Link>
                </Grid>
              );
            })}
          </Grid>

          <Box mt={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography>No Recent Activities</Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Main>
    </Box>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});

const Panel = styled("div")(({ theme, background }) => ({
  backgroundColor: background,
  height: "80px",
  width: "100%",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer",
}));

const PanelIcon = styled("div")({
  height: "40px",
  background: "rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PanelText = styled(Typography)({
  width: "100%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Activity = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ActivityInfo = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ActivityDate = styled(Typography)({ display: "none" });

const CircularIcon = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(3),
  borderRadius: "50%",
  height: theme.spacing(4),
  width: theme.spacing(4),
  background: "rgba(255, 90, 94, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
