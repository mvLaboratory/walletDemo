import {
  LOAD_WALETS_BALANCE_BEGIN,
  LOAD_WALETS_BALANCE_SUCCESS,
  LOAD_WALETS_BALANCE_FAILURE,
  SAVE_WALLET_BEGIN,
  SAVE_WALLET_SUCCESS,
  SAVE_WALLET_FAILURE,
  ADD_WALLETS_BEGIN,
  ADD_WALLETS_SUCCESS,
  ADD_WALLETS_FAILURE
} from "../actions/BalanceActions";

const defaultBalance = [];

const initialState = {
  items: defaultBalance,
  loading: false,
  saveWalletLoading: false,
  saveWalletResult: false,
  addWalletResult: false,
  error: null
};

export default function BalanceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WALETS_BALANCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_WALETS_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.balance
      };

    case LOAD_WALETS_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case SAVE_WALLET_BEGIN:
      return {
        ...state,
        saveWalletLoading: true,
        error: null
      };

    case SAVE_WALLET_SUCCESS:
      return {
        ...state,
        saveWalletLoading: false,
        saveWalletResult: action.payload.balance
      };

    case SAVE_WALLET_FAILURE:
      return {
        ...state,
        saveWalletLoading: false,
        error: action.payload.error,
        items: []
      };
    case ADD_WALLETS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_WALLETS_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ADD_WALLETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
