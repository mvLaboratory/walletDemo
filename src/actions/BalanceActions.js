import axios from "axios";

export function loadWaletsBalance() {
  return dispatch => {
    dispatch(loadWaletsBalanceBegin());
    return axios
      .get("http://localhost:30001/balance")
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

export function loadBalanceSummary() {
  return dispatch => {
    dispatch(loadBalanceSummaryBegin());
    return axios
      .get("http://localhost:30001/balanceSummary")
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(loadBalanceSummarySuccess(responseData));
        return responseData;
      })
      .catch(error => dispatch(loadBalanceSummaryFailure(error)));
  };
}

export function saveWallet(wallet) {
  return dispatch => {
    dispatch(saveWalletBegin());
    return axios
      .put(`http://localhost:30001/balance/${wallet.id}`, wallet)
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(saveWalletSuccess(responseData));
        return responseData;
      })
      .then(() => {
        dispatch(loadWaletsBalance())
      })
      .catch(error => dispatch(saveWalletFailure(error)));
  };
}

export function addWallet(wallet) {
  return dispatch => {
    dispatch(addWalletBegin());
    return axios
      .post("http://localhost:30001/balance", wallet)
      .then(response => {
        dispatch(addWalletSuccess());
        return response.data;
      })
      .then(() => {
        dispatch(loadWaletsBalance())
      })
      .catch(error => dispatch(addWalletFailure(error)));
  };
}

export const LOAD_WALETS_BALANCE_BEGIN = "LOAD_WALETS_BALANCE_BEGIN";
export const LOAD_WALETS_BALANCE_SUCCESS = "LOAD_WALETS_BALANCE_SUCCESS";
export const LOAD_WALETS_BALANCE_FAILURE = "LOAD_WALETS_BALANCE_FAILURE";

export const LOAD_BALANCE_SUMMARY_BEGIN = "LOAD_BALANCE_SUMMARY_BEGIN";
export const LOAD_BALANCE_SUMMARY_SUCCESS = "LOAD_BALANCE_SUMMARY_SUCCESS";
export const LOAD_BALANCE_SUMMARY_FAILURE = "LOAD_BALANCE_SUMMARY_FAILURE";

export const SAVE_WALLET_BEGIN = "SAVE_WALLET_BEGIN";
export const SAVE_WALLET_SUCCESS = "SAVE_WALLET_SUCCESS";
export const SAVE_WALLET_FAILURE = "SAVE_WALLET_FAILURE";

export const LOAD_CURRENCY_BEGIN = "LOAD_CURRENCY_BEGIN";
export const LOAD_CURRENCY_SUCCESS = "LOAD_CURRENCY_SUCCESS";
export const LOAD_CURRENCY_FAILURE = "LOAD_CURRENCY_FAILURE";

export const ADD_WALLETS_BEGIN = "ADD_WALLETS_BEGIN";
export const ADD_WALLETS_SUCCESS = "ADD_WALLETS_SUCCESS";
export const ADD_WALLETS_FAILURE = "ADD_WALLETS_FAILURE";


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


export const loadBalanceSummaryBegin = () => ({
  type: LOAD_BALANCE_SUMMARY_BEGIN
});

export const loadBalanceSummarySuccess = balanceSummary => ({
  type: LOAD_BALANCE_SUMMARY_SUCCESS,
  payload: { balanceSummary }
});

export const loadBalanceSummaryFailure = error => ({
  type: LOAD_BALANCE_SUMMARY_FAILURE,
  payload: { error }
});


export const saveWalletBegin = () => ({
  type: SAVE_WALLET_BEGIN
});

export const saveWalletSuccess = saveResult => ({
  type: SAVE_WALLET_SUCCESS,
  payload: { saveResult }
});

export const saveWalletFailure = error => ({
  type: SAVE_WALLET_FAILURE,
  payload: { error }
});


export const addWalletBegin = () => ({
  type: ADD_WALLETS_BEGIN
});

export const addWalletSuccess = addResult => ({
  type: ADD_WALLETS_SUCCESS,
  payload: { addResult }
});

export const addWalletFailure = error => ({
  type: ADD_WALLETS_FAILURE,
  payload: { error }
});
