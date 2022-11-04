import { EMAIL_DATA, SET_ORDER } from "../actions/types";

const initialState = {
  email: "",
  order: null,
};

const AccountDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_DATA:
      return {
        ...state,
        email: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default AccountDataReducer;
