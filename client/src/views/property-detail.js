import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";

import { styled } from "@material-ui/styles";

import Alert from "@material-ui/lab/Alert";

import {
  FavoriteBorderOutlined,
  MailOutline,
  PhotoCamera,
  Print,
  RoomOutlined,
  ShareOutlined,
  Streetview,
  Chat,
} from "@material-ui/icons";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";

import PropertyService from "../services/property";
import FavouriteService from "../services/favourites";
import UserService from "../services/user";

import { useHistory, useLocation, useParams } from "react-router-dom";
import { useStateValue } from "../redux/state-provider";
import ReviewService from "../services/reviews";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PropertyDetail() {
  const history = useHistory();
  const location = useLocation();
  let { id } = useParams();
  id = parseInt(id);

  const [value, setValue] = useState(0);
  const [property, setProperty] = useState({});

  const [allReviews, setAllReviews] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [viewOption, setViewOption] = useState({
    view: "photo",
    src: "",
  });

  const [{ user, isAuthenticated }] = useStateValue();

  const [userReview, setUserReview] = useState({
    reviewed_by: user._id,
    propertyID: id,
    rating: 2,
    reviewText: "",
    submitted: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      FavouriteService.GetAllFavourites(user._id).then((response) => {
        setFavourites(response.data.favourites);
      });
    }
  }, [isAuthenticated, user._id]);

  useEffect(() => {
    PropertyService.getPropertyDetail(id).then((response) => {
      setProperty(response.data.property);
      setIsLoading(false);
      setViewOption((viewOption) => ({
        ...viewOption,
        src: response.data.property.photoLargeThumbnailUrl,
      }));
    });

    ReviewService.GetAllReviews(id).then(({ data }) => setAllReviews(data));
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setActiveViewOption = (activeOption, imgSrc) => {
    setViewOption({
      view: activeOption,
      src: imgSrc,
    });
  };

  const shareClickHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Hello World",
          url: window.location.href,
        })
        .then(() => console.log("Successful share! 🎉"))
        .catch((err) => console.error(err));
    }
  };

  const favouriteClickHandler = () => {
    const { pathname } = location;
    if (!isAuthenticated) {
      history.push({
        pathname: "/login",
        state: { from: pathname },
      });
    } else {
      setFavourites([...favourites, id]);
      FavouriteService.AddNewFavourite(id, user._id);
    }
  };

  const addNewContact = async () => {
    const { pathname } = location;
    if (!isAuthenticated) {
      history.push({
        pathname: "/login",
        state: { from: pathname },
      });
    } else {
      const brandName = property.branch.brandName
        .split(" ")
        .join("-")
        .toLowerCase();

      const contactEmail = `contact@${brandName}.com`;

      const { data: contact } = await UserService.GetCompanyDetailsByEmail(
        contactEmail
      );

      user._id !== contact._id &&
        UserService.AddNewContact(user._id, contact._id).then(() => {
          history.push("/dashboard/messages");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ReviewService.AddNewReview(userReview);
    setUserReview({
      reviewed_by: user._id,
      propertyID: id,
      rating: 2,
      reviewText: "",
      submitted: true,
    });
  };

  return (
    <Main>
      <PropertyViewOptions>
        <ButtonIcon
          variant="contained"
          color={viewOption.view === "photo" ? "secondary" : "primary"}
          disableElevation
          onClick={() =>
            setActiveViewOption("photo", property.photoLargeThumbnailUrl)
          }
        >
          <PhotoCamera fontSize="small" />
        </ButtonIcon>

        <ButtonIcon
          variant="contained"
          color={viewOption.view === "map" ? "secondary" : "primary"}
          disableElevation
          onClick={() =>
            setActiveViewOption("map", property.mobilePropertyMapViewUrl)
          }
        >
          <RoomOutlined fontSize="small" />
        </ButtonIcon>

        <ButtonIcon
          variant="contained"
          color={viewOption.view === "street" ? "secondary" : "primary"}
          disableElevation
          onClick={() =>
            setActiveViewOption("street", property.mobileStreetViewUrl)
          }
        >
          <Streetview fontSize="small" />
        </ButtonIcon>
      </PropertyViewOptions>

      <PropertyImage src={viewOption.src} />

      <Container>
        <Box my={1} display="flex" justifyContent="flex-end">
          <ButtonIcon variant="contained" color="primary" disableElevation>
            <MailOutline fontSize="small" />
          </ButtonIcon>

          <ButtonIcon
            variant="contained"
            color={favourites.includes(id) ? "secondary" : "primary"}
            disableElevation
            onClick={favouriteClickHandler}
          >
            <FavoriteBorderOutlined fontSize="small" />
          </ButtonIcon>

          <ButtonIcon
            variant="contained"
            color="primary"
            disableElevation
            onClick={shareClickHandler}
          >
            <ShareOutlined fontSize="small" />
          </ButtonIcon>

          <ButtonIcon
            variant="contained"
            color="primary"
            disableElevation
            onClick={window.print}
          >
            <Print fontSize="small" />
          </ButtonIcon>
        </Box>

        <Typography variant="h5">
          {!isLoading &&
            `${property.bedrooms} bedroom ${property.propertyType}`}
        </Typography>

        <Box mb={3}>
          <Typography>{!isLoading && property.address}</Typography>
        </Box>

        <Typography variant="h6">
          <Box
            display="flex"
            align-items="center"
            justifyContent="space-between"
            mb={2}
          >
            {property.displayPrices && property.displayPrices[0].displayPrice}
            <Button
              variant="contained"
              color="secondary"
              onClick={addNewContact}
            >
              <Chat />
              Contact Agent
            </Button>
          </Box>
        </Typography>

        <Paper>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Location" {...a11yProps(1)} />
              <Tab label="Agent Details" {...a11yProps(2)} />
              <Tab label="Reviews" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Typography variant="body2" color="textSecondary">
              {property.summary}
            </Typography>

            <Box mt={1}>
              <Typography>Features</Typography>
              <ul>
                {property.features &&
                  property.features.map((feature, index) => {
                    return <li key={index}>{feature.featureDescription}</li>;
                  })}
              </ul>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <iframe
              title="property"
              src={property.mobilePropertyMapViewUrl}
              height="300"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography>{property.branch?.brandName}</Typography>
            <Typography variant="caption">
              {property.branch?.address}
            </Typography>
            <img
              alt={property.branch?.brandName}
              src={property.branch?.branchLogo}
            />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Box display="flex" mb={2}>
              <Typography>
                This property has {allReviews.length} Reviews
              </Typography>
            </Box>

            {allReviews.length > 0 &&
              allReviews.map((review) => {
                return (
                  <Review
                    userName="Tom Wilson"
                    datePosted={review.created_at}
                    reviewText={review.reviewText}
                    rating={review.rating}
                  />
                );
              })}

            {userReview.submitted ? (
              <Box mt={2}>
                <Alert variant="filled" severity="success">
                  Review Created!
                </Alert>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Box mt={3}>
                  <Typography variant="h6">Create a review</Typography>
                  <Box component="fieldset" borderColor="transparent">
                    <Rating
                      name="simple-controlled"
                      precision={0.5}
                      value={userReview.rating}
                      onChange={(e, newValue) =>
                        setUserReview({ ...userReview, rating: newValue })
                      }
                    />
                  </Box>

                  <TextField
                    color="primary"
                    label="Enter your review here"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userReview.reviewText}
                    onChange={(e) =>
                      setUserReview({
                        ...userReview,
                        reviewText: e.target.value,
                      })
                    }
                  />

                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      align="right"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </TabPanel>
        </Paper>
      </Container>
    </Main>
  );
}

function Review({ userName, datePosted, reviewText, rating }) {
  return (
    <Box display="flex" mb={2}>
      <Avatar />
      <Box ml={2}>
        <Typography>
          {userName}
          <Rating value={rating} precision={0.5} size="small" readOnly />
        </Typography>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          {datePosted}
        </Typography>
        <Typography variant="body2">{reviewText}</Typography>
      </Box>
    </Box>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  position: "relative",
});

const PropertyImage = styled("iframe")(({ theme }) => ({
  position: "relative",
  height: "200px",
  width: "100%",
  border: "none",
}));

const PropertyViewOptions = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  display: "flex",
  zIndex: 99,
}));

const ButtonIcon = styled(Button)(({ theme }) => ({
  outline: "none",
  border: "none",
  padding: 0,
  marginRight: theme.spacing(1),
  height: theme.spacing(4),
  width: theme.spacing(4),
  minWidth: theme.spacing(4),

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& > .MuiSvgIcon-root": {
    color: "white",
  },
}));
