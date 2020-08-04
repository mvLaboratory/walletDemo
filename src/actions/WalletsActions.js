import axios from "axios";

export function loadWallets() {
  return dispatch => {
    dispatch(loadWalletsBegin());
    return axios
      .get("https://walletdev.azurewebsites.net/api/wallets")
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(loadWalletsSuccess(responseData));
        return responseData;
      })
      .catch(error => dispatch(loadWalletsFailure(error)));
  };
}

export const LOAD_WALLETS_BEGIN = "LOAD_WALLETS_BEGIN";
export const LOAD_WALLETS_SUCCESS = "LOAD_WALLETS_SUCCESS";
export const LOAD_WALLETS_FAILURE = "LOAD_WALLETS_FAILURE";

export const loadWalletsBegin = () => ({
  type: LOAD_WALLETS_BEGIN
});

export const loadWalletsSuccess = (wallets) => ({
  type: LOAD_WALLETS_SUCCESS,
  payload: {wallets}
});

export const loadWalletsFailure = error => ({
  type: LOAD_WALLETS_FAILURE,
  payload: { error }
});