import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../redux/state-provider";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";

import {
  Add,
  ChevronLeft,
  DashboardOutlined,
  ExitToAppOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  MessageOutlined,
  PersonOutlineOutlined,
  Search,
  StarBorderOutlined,
} from "@material-ui/icons";
import Logo from "./logo";
import AuthService from "../services/Auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  logo: {
    color: "white",
    textTransform: "uppercase",
  },

  drawerHeader: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    background: "rgba(0,0,0,0.3)",
  },

  paper: {
    background: "#1d293e",
    color: "#8a99b3",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const history = useHistory();

  const [query, setQuery] = useState("");

  const [{ sidebarOpen }, dispatch] = useStateValue();

  const sidebarLinks = [
    { text: "Dashboard", icon: <DashboardOutlined /> },
    { text: "Messages", icon: <MessageOutlined /> },
    { text: "Recommended", icon: <HomeOutlined /> },
    { text: "Favourites", icon: <FavoriteBorderOutlined /> },
    { text: "Reviews", icon: <StarBorderOutlined /> },
    { text: "Logout", icon: <ExitToAppOutlined /> },
  ];

  const toggleDrawer = (link) => {
    dispatch({ type: "SET_SIDEBAR_OPEN", open: !sidebarOpen });

    if (link !== undefined) {
      link === "Logout"
        ? AuthService.Logout().then(() => {
            history.push("/");
            dispatch({ type: "LOGOUT" });
          })
        : setTimeout(() => {
            const base = "/dashboard";
            const href = link.split(" ").join("-").toLowerCase();
            history.push(`${base}/${href}`);
          }, 200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/properties?search=${query}`);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={sidebarOpen}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.drawerHeader}>
        <Logo textColour="white" />
        <IconButton onClick={() => toggleDrawer()}>
          <ChevronLeft style={{ color: "#788195" }} />
        </IconButton>
      </div>
      <Divider />
      <List>
        <form onSubmit={handleSubmit}>
          <Box component={ListItem} mb={2}>
            <TextField
              color="secondary"
              label="Search for properties"
              variant="outlined"
              size="small"
              value={query}
              onChange={(e, newValue) => setQuery(newValue)}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search style={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Box>
        </form>

        {sidebarLinks.map((option, index) => (
          <ListItem
            key={index}
            onClick={() => toggleDrawer(option.text)}
            button
          >
            <ListItemIcon style={{ color: "#788195" }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText>{option.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
