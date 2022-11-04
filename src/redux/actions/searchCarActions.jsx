import { SEARCH_CAR_DATA } from "./types";

function SearchCar(driverType = "", date = "", time = "", seat = "") {
  return (dispatch) => {
    dispatch({
      type: SEARCH_CAR_DATA,
      payload: {
        driverType,
        date,
        time,
        seat,
      },
    });
  };
}

export { SearchCar };
