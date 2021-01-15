import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DividerWithText } from "../components";

import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { GoogleLoginButton } from "react-social-login-buttons";

import useAuth from "../hooks/useAuth";

export default function Register() {
  const location = useLocation();
  const history = useHistory();

  const { LoginWithEmailAndPassword } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const to = location.state ? location.state.from : "/blaaaaa";
    history.push(to);

    const { email, password } = formData;
    LoginWithEmailAndPassword(email, password);
  };

  return (
    <Main>
      <Container>
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Login to your account
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>

        <LoginForm onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email Address"
            variant="outlined"
            color="primary"
            size="small"
            margin="normal"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            color="primary"
            size="small"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <FormGroup row>
              <FormControlLabel
                label="Remember Me"
                control={<Checkbox color="primary" />}
              />
            </FormGroup>
          </Box>

          <Box mb={3} mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Login
            </Button>
          </Box>

          <DividerWithText>OR</DividerWithText>

          <Box display="flex">
            <GoogleLoginButton
              align="center"
              onClick={() => history.push("/authentication/google")}
            >
              <Typography variant="body1">Google</Typography>
            </GoogleLoginButton>
          </Box>
        </LoginForm>
      </Container>
    </Main>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});

const LoginForm = styled("form")({});
