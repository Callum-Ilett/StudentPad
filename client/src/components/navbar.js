import React from "react";
import { styled } from "@material-ui/styles";
import { ExitToApp, Menu, Person } from "@material-ui/icons";
import { useStateValue } from "../redux/state-provider";
import { useHistory } from "react-router-dom";
import Logo from "./logo";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { Sidebar } from ".";

export default function Dashboard() {
  const [
    { user, isAuthenticated, sidebarOpen, navbarOpen },
    dispatch,
  ] = useStateValue();

  const history = useHistory();

  const toggleMenu = (link) => {
    if (link !== undefined) history.push(link);

    if (isAuthenticated) {
      dispatch({ type: "SET_SIDEBAR_OPEN", open: !sidebarOpen });
    } else {
      dispatch({ type: "SET_NAVBAR_OPEN", open: !navbarOpen });
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar position="sticky" elevation={0} open={navbarOpen} color="default">
        <Box component={Toolbar} justifyContent="space-between">
          {!isAuthenticated && <Logo textColour="textPrimary" />}

          <NavbarToggle onClick={toggleMenu}>
            <Menu />
          </NavbarToggle>

          {isAuthenticated && <Avatar src={user.image} />}
        </Box>
        <Nav>
          <NavMenu>
            <NavItem onClick={() => toggleMenu("/login")}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText color="textPrimary" primary="Login" />
            </NavItem>

            <NavItem onClick={() => toggleMenu("/register")}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </NavItem>
          </NavMenu>
        </Nav>
      </Navbar>
    </>
  );
}

const Navbar = styled(AppBar)(({ theme, open }) => ({
  background: "white",
  overflow: "hidden",
  height: open ? "132px" : "56px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  transition: theme.transitions.create(["margin", "width", "height"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const NavbarToggle = styled(IconButton)({});

const Nav = styled("nav")({ padding: "0 16px" });
const NavMenu = styled(List)({});

const NavItem = styled(ListItem)({
  padding: 0,
});
