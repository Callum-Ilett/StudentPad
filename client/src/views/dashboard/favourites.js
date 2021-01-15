import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import { Sidebar } from "../../components";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import FavouriteService from "../../services/favourites";
import { useStateValue } from "../../redux/state-provider";

import { Delete, Edit, Visibility } from "@material-ui/icons";
import PropertyService from "../../services/property";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [favouriteProperties, setFavouriteProperties] = useState([]);

  const [{ user }] = useStateValue();

  useEffect(() => {
    const fetchFavourites = async () => {
      const userID = user._id;
      const { data } = await FavouriteService.GetAllFavourites(userID);
      setFavourites(data.favourites);
    };

    fetchFavourites();
  }, []);

  useEffect(() => {
    const fetchProperty = async (propertyID) => {
      const { data } = await PropertyService.getPropertyDetail(propertyID);
      setFavouriteProperties((prevState) => [...prevState, data.property]);
    };

    favourites.forEach((propertyID) => {
      fetchProperty(propertyID);
    });
  }, [favourites]);

  return (
    <>
      <Sidebar />
      <Main>
        <Container>
          <Card variant="outlined">
            <CardContent>
              {favouriteProperties.length !== 0 &&
                favouriteProperties.map((property) => (
                  <Favourite
                    key={property.identifier}
                    name={`${property.bedrooms} bedroom ${property.propertyType}`}
                    address={property.address}
                    image={property.photoLargeThumbnailUrl}
                    price={property.displayPrices[0].displayPrice}
                  />
                ))}
            </CardContent>
          </Card>
        </Container>
      </Main>
    </>
  );
}

function Favourite({ name, address, image, price }) {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <img alt={name} src={image} width="240" />
        <Box ml={2}>
          <Typography variant="h6" color="textPrimary">
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {address}
          </Typography>
        </Box>
      </Box>
      <Box my={2}>
        <Divider />
      </Box>
    </>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});
