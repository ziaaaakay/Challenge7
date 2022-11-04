import { SEARCH_CAR_DATA } from "../actions/types";

const initialState = {
  driverType: "",
  date: "",
  time: "",
  seat: Number,
};

const SearchCarData = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CAR_DATA:
      return {
        ...state,
        driverType: action.payload.driverType,
        date: action.payload.date,
        time: action.payload.time,
        seat: action.payload.seat,
      };
    default:
      return state;
  }
};

export default SearchCarData;
