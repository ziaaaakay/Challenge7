import { EMAIL_DATA, SET_ORDER } from "./types";

function SetEmail(email = "") {
  return (dispatch) => {
    dispatch({
      type: EMAIL_DATA,
      payload: {
        email,
      },
    });
  };
}

function SetOrder(order = null) {
  return (dispatch) => {
    dispatch({
      type: SET_ORDER,
      payload: {
        order,
      },
    });
  };
}

export { SetEmail, SetOrder };
