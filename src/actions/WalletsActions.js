import { GetRequest, PostRequest } from "../shared/serviceUtils";

export function loadWallets(auth) {
  return (dispatch) => {
    dispatch(loadWalletsBegin());
    return GetRequest("/api/wallets", auth)
      .then((response) => {
        return response.data;
      })
      .then((responseData) => {
        dispatch(loadWalletsSuccess(responseData));
        return responseData;
      })
      .catch((error) => dispatch(loadWalletsFailure(error)));
  };
}

export function addWallet(wallet, auth) {
  return (dispatch) => {
    dispatch(addWalletBegin());
    return PostRequest("/api/wallets", wallet, auth)
      .then((response) => {
        dispatch(addWalletSuccess());
        return response.data;
      })
      .catch((error) => dispatch(addWalletFailure(error)));
  };
}

export const LOAD_WALLETS_BEGIN = "LOAD_WALLETS_BEGIN";
export const LOAD_WALLETS_SUCCESS = "LOAD_WALLETS_SUCCESS";
export const LOAD_WALLETS_FAILURE = "LOAD_WALLETS_FAILURE";

export const ADD_WALLETS_BEGIN = "ADD_WALLETS_BEGIN";
export const ADD_WALLETS_SUCCESS = "ADD_WALLETS_SUCCESS";
export const ADD_WALLETS_FAILURE = "ADD_WALLETS_FAILURE";

export const loadWalletsBegin = () => ({
  type: LOAD_WALLETS_BEGIN,
});

export const loadWalletsSuccess = (wallets) => ({
  type: LOAD_WALLETS_SUCCESS,
  payload: { wallets },
});

export const loadWalletsFailure = (error) => ({
  type: LOAD_WALLETS_FAILURE,
  payload: { error },
});

export const addWalletBegin = () => ({
  type: ADD_WALLETS_BEGIN,
});

export const addWalletSuccess = (addWalletResult) => ({
  type: ADD_WALLETS_SUCCESS,
  payload: { addWalletResult },
});

export const addWalletFailure = (error) => ({
  type: ADD_WALLETS_FAILURE,
  payload: { error },
});
