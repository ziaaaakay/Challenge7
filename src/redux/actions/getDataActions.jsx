import { GET_CAR_DATA } from "./types";

let axios = require("axios");
var config = {
  method: "get",
  url: "https://rent-cars-api.herokuapp.com/admin/car",
  headers: {},
};

function getCarData() {
  return (dispatch) => {
    axios(config)
      .then((response) => {
        dispatch({
          type: GET_CAR_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export { getCarData };
