import React from "react";

import {
  Home,
  Register,
  Login,
  PropertyDetail,
  Properties,
  Reviews,
  Favourites,
  Messages,
  Conversations,
  MyProperties,
  Dashboard,
} from "../views";

export const routes = [
  {
    path: "/register",
    component: Register,
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/login",
    component: Login,
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/properties",
    component: Properties,
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/property/:id",
    component: PropertyDetail,
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/dashboard/recommended",
    component: MyProperties,
    exact: false,
    private: true,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/dashboard/reviews",
    component: Reviews,
    exact: false,
    private: true,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/dashboard/favourites",
    component: Favourites,
    exact: false,
    private: true,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/dashboard/messages/:id",
    component: Conversations,
    exact: false,
    private: true,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/dashboard/messages",
    component: Messages,
    exact: false,
    private: true,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/dashboard",
    component: Dashboard,
    exact: false,
    private: true,
    fallback: <div> Loading... </div>,
  },

  {
    path: "/",
    component: Home,
    exact: false,
    private: false,
    fallback: <div> Loading... </div>,
  },
];
