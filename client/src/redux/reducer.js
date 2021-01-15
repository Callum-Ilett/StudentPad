export const initialState = {
  user: {},
  isAuthenticated: false,
  navbarOpen: false,
  sidebarOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.userInfo,
      };

    case "SET_IS_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.status,
      };

    case "SET_NAVBAR_OPEN":
      return {
        ...state,
        navbarOpen: action.open,
      };

    case "SET_SIDEBAR_OPEN":
      return {
        ...state,
        sidebarOpen: action.open,
      };

    default:
      return state;
  }
};

export default reducer;
