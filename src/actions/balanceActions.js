import axios from "axios";

export function loadWaletsBalance(callback) {
  return dispatch => {
    return axios
      .get("http://www.personalwallet.com/api/balance")
      .then(response => {
        dispatch(setWaletsBalance(response, callback));
      });
  };
}

export function setWaletsBalance(data, callback) {
  console.log("ACTIONS");
  callback(data.Balance);
  return {
    type: "LOAD_BALANCE",
    Balance: data.Balance
  };
}
