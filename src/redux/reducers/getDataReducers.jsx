import { GET_CAR_DATA } from "../actions/types";

const initialState = {
  carData: [],
};

const GetDataReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAR_DATA:
      return {
        ...state,
        carData: action.payload,
      };
    default:
      return state;
  }
};

export default GetDataReducers;
