import axios from "axios";

const buildApiURL = (API_URL, params) => {
  const CORS_PROXY = "https://young-ocean-99352.herokuapp.com/";

  const queryString = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

  return CORS_PROXY + API_URL + queryString;
};

const propertyService = {
  getSouthamptonProperties: async () => {
    const API_URL = "http://api.rightmove.co.uk/api/rent/find?";

    const URL_PARAMS = {
      index: 0,
      sortType: 2,
      numberOfPropertiesRequested: 20,
      locationIdentifier: "REGION%5e1231",
      apiApplication: "IPAD",
    };

    const url = buildApiURL(API_URL, URL_PARAMS);

    try {
      return await axios.get(url);
    } catch (error) {
      return error.response;
    }
  },

  getPropertyDetail: async (id) => {
    const API_URL = "http://api.rightmove.co.uk/api/propertyDetails?";
    const URL_PARAMS = {
      propertyId: id,
      apiApplication: "IPAD",
    };

    const url = buildApiURL(API_URL, URL_PARAMS);

    try {
      return await axios.get(url);
    } catch (error) {
      return error.response;
    }
  },
};

export default propertyService;
