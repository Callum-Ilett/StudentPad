import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import { styled } from "@material-ui/styles";

import { MapOutlined, Search, SwapVert } from "@material-ui/icons";

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";

import PropertyService from "../../services/property";
import { Link, useLocation } from "react-router-dom";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    PropertyService.getSouthamptonProperties().then((response) => {
      setProperties(response.data.properties);
      setIsLoading(false);
    });
  }, []);

  return (
    <Main>
      <Container>
        <Typography variant="h6">
          Recommended Properties based on your likings
        </Typography>
        <Grid container spacing={3}>
          {(isLoading ? Array.from(new Array(3)) : properties).map(
            (item, index) => (
              <Grid item xs={12} md={4} lg={3}>
                <Link key={index} to={`/property/${item?.identifier}`}>
                  <Card
                    style={{
                      marginTop: "16px",
                      height: "308px",
                      position: "relative",
                    }}
                  >
                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        style={{ height: "140px" }}
                      />
                    ) : (
                      <CardMedia
                        style={{ height: "140px" }}
                        image={item.photoLargeThumbnailUrl}
                      />
                    )}

                    <CardContent>
                      {isLoading ? (
                        <>
                          <Skeleton
                            animation="wave"
                            height={10}
                            style={{ marginBottom: 6 }}
                          />
                          <Skeleton animation="wave" height={10} width="80%" />
                        </>
                      ) : (
                        <>
                          <Typography variant="h6" color="textPrimary">
                            {`${item.bedrooms} bedroom ${item.propertyType}`}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.address}
                          </Typography>

                          <DisplayPrice
                            align="right"
                            variant="body1"
                            color="textPrimary"
                            component="p"
                          >
                            {item.displayPrices[0].displayPrice}
                          </DisplayPrice>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Main>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "8px",
});

const SwitchView = styled(Box)({});

const SearchBar = styled(Paper)({});

const Form = styled("form")({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
});

const StyledIconButton = styled(IconButton)({
  padding: 10,
});

const StyledInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const DisplayPrice = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 10,
}));

const Seperator = styled(Divider)({
  height: 28,
  margin: 4,
});
