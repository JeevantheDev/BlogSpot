import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType, on = false, timeOut = 5000) => (
  dispatch
) => {
  const id = uuidv4();
  on = !on;
  dispatch({
    type: "SET_ALERT",
    payload: { msg, alertType, on, id },
  });

  setTimeout(
    () =>
      dispatch({
        type: "REMOVE_ALERT",
        payload: id,
      }),
    timeOut
  );
};
