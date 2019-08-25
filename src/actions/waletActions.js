import axios from "axios";

export function loadWaletsBalance() {
  return dispatch => {
    dispatch(loadWaletsBalanceBegin());
    return axios
      .get("http://localhost:3001/balance")
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(loadWaletsBalanceSuccess(responseData));
        return responseData;
      })
      .catch(error => dispatch(loadWaletsBalanceFailure(error)));
  };
}

export function addWalet(waletName, initBalance) {
  return dispatch => {
    dispatch(addWaletBegin());
    return axios
      .post("http://localhost:3001/balance", {
        name: waletName,
        value: initBalance
      })
      .then(response => {
        dispatch(addWaletSuccess());
        return response.data;
      })
      .catch(error => dispatch(addWaletFailure(error)));
  };
}

export const LOAD_WALETS_BALANCE_BEGIN = "LOAD_WALETS_BALANCE_BEGIN";
export const LOAD_WALETS_BALANCE_SUCCESS = "LOAD_WALETS_BALANCE_SUCCESS";
export const LOAD_WALETS_BALANCE_FAILURE = "LOAD_WALETS_BALANCE_FAILURE";

export const ADD_WALETS_BEGIN = "ADD_WALETS_BEGIN";
export const ADD_WALETS_SUCCESS = "ADD_WALETS_SUCCESS";
export const ADD_WALETS_FAILURE = "ADD_WALETS_FAILURE";

export const loadWaletsBalanceBegin = () => ({
  type: LOAD_WALETS_BALANCE_BEGIN
});

export const loadWaletsBalanceSuccess = balance => ({
  type: LOAD_WALETS_BALANCE_SUCCESS,
  payload: { balance }
});

export const loadWaletsBalanceFailure = error => ({
  type: LOAD_WALETS_BALANCE_FAILURE,
  payload: { error }
});

export const addWaletBegin = () => ({
  type: ADD_WALETS_BEGIN
});

export const addWaletSuccess = () => ({
  type: ADD_WALETS_SUCCESS,
  payload: {}
});

export const addWaletFailure = error => ({
  type: ADD_WALETS_FAILURE,
  payload: { error }
});
