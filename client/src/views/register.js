import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { Link, useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { DividerWithText } from "../components";

import {
  Button,
  Container,
  TextField,
  InputAdornment,
  Box,
  FormGroup,
  FormControlLabel,
  Typography,
  Checkbox,
} from "@material-ui/core";

import { GoogleLoginButton } from "react-social-login-buttons";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const history = useHistory();
  const { RegisterWithEmailAndPassword } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    RegisterWithEmailAndPassword(formData);
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
          Register your account
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Have an account? <Link to="/login">Sign In</Link>
        </Typography>

        <RegisterForm onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Full Name or Company Name"
            variant="outlined"
            color="primary"
            size="small"
            margin="normal"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />

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
            type={showPassword ? "text" : "password"}
            variant="outlined"
            color="primary"
            size="small"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Box mb={3}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Register
            </Button>
          </Box>

          <DividerWithText>OR</DividerWithText>

          <Box display="flex">
            <GoogleLoginButton
              align="center"
              onClick={() => history.push("/api/authentication/google")}
            >
              <Typography variant="body1">Google</Typography>
            </GoogleLoginButton>
          </Box>
        </RegisterForm>
      </Container>
    </Main>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});

const RegisterForm = styled("form")({});
