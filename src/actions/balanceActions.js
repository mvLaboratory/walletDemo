import axios from "axios";

export function loadWaletsBalance() {
  return dispatch => {
    dispatch(loadWaletsBalanceBegin());
    return axios
      .get("http://www.personalwallet.com/api/balance")
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

export const LOAD_WALETS_BALANCE_BEGIN = "LOAD_WALETS_BALANCE_BEGIN";
export const LOAD_WALETS_BALANCE_SUCCESS = "LOAD_WALETS_BALANCE_SUCCESS";
export const LOAD_WALETS_BALANCE_FAILURE = "LOAD_WALETS_BALANCE_FAILURE";

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
