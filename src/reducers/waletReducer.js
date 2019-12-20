import {
  LOAD_WALETS_BALANCE_BEGIN,
  LOAD_WALETS_BALANCE_SUCCESS,
  LOAD_WALETS_BALANCE_FAILURE,
  SAVE_WALLET_BEGIN,
  SAVE_WALLET_SUCCESS,
  SAVE_WALLET_FAILURE,
  LOAD_CURRENCY_BEGIN,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_FAILURE,
  ADD_WALETS_BEGIN,
  ADD_WALETS_SUCCESS,
  ADD_WALETS_FAILURE
} from "../actions/waletActions";

const defaultBalance = [];

const initialState = {
  items: defaultBalance,
  currency: [],
  loading: false,
  currencyLoading: false,
  saveWalletLoading: false,
  saveWalletResult: false,
  error: null
};

export default function waletReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WALETS_BALANCE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_WALETS_BALANCE_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.balance
      };

    case LOAD_WALETS_BALANCE_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
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

    case LOAD_CURRENCY_BEGIN:
      return {
        ...state,
        currencyLoading: true,
        error: null
      };

    case LOAD_CURRENCY_SUCCESS:
      return {
        ...state,
        currencyLoading: false,
        currency: action.payload.currency
      };
  
    case LOAD_CURRENCY_FAILURE:
      return {
        ...state,
        currencyLoading: false,
        error: action.payload.error,
        items: []
      };


    case ADD_WALETS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_WALETS_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ADD_WALETS_FAILURE:
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
