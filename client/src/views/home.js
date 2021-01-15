import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { MyLocation } from "@material-ui/icons";

import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
} from "@material-ui/core";

export default function Home() {
  const history = useHistory();

  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query && propertyType) {
      history.push(`/properties?search=${query}&propertyType=${propertyType}`);
    } else if (propertyType) {
      history.push(`/properties?propertyType=${propertyType}`);
    } else if (query) {
      history.push(`/properties?search=${query}`);
    } else {
      history.push(`/properties`);
    }
  };

  return (
    <Main>
      <Hero>
        <Container>
          <Heading variant="h6">Find Your Perfect Accomodation</Heading>
          <SubHeading variant="subtitle1">
            Over 50+ properties in Southampton, <br />
            just for students
          </SubHeading>

          <SearchContainer>
            <PropertySearch elevation={0}>
              <Form onSubmit={handleSubmit}>
                <TextFieldGroup>
                  <CustomTextField
                    color="primary"
                    label="Enter Keyword"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <CustomTextField
                    color="secondary"
                    label="Southampton"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MyLocation />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    disabled
                  />

                  <CustomTextField
                    color="primary"
                    id="outlined-select-currency"
                    select
                    label="Property Type"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="houses">Houses</MenuItem>
                    <MenuItem value="apartments">Apartment</MenuItem>
                    <MenuItem value="bungalows">Bungalows</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </CustomTextField>
                </TextFieldGroup>

                <RoundedButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Search
                </RoundedButton>
              </Form>
            </PropertySearch>
          </SearchContainer>
        </Container>
      </Hero>
    </Main>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
});

const Hero = styled("section")(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(8),
  background: `linear-gradient(#453fa2de, #f35863de),
    url("https://www.unitestudents.com/UniteStudents/media/Properties/Southampton/Orion%20Point/0137-webster.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightBold,
  textAlign: "center",
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[300],
  textAlign: "center",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  background: "rgba(255, 255, 255, 0.36)",
  padding: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    borderRadius: "200px",
    padding: theme.spacing(2),
  },
}));

const PropertySearch = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("md")]: {
    borderRadius: "200px",
    padding: theme.spacing(3),
  },
}));

const Form = styled("form")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const TextFieldGroup = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "380px",
    borderRadius: "200px",
  },
}));

const RoundedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: "5rem",

  [theme.breakpoints.up("md")]: {
    width: "400px",
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    margin: "0 auto",
  },
}));
