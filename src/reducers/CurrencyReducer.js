import {
  LOAD_CURRENCY_BEGIN,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_FAILURE
} from "../actions/CurrencyActions";

const defaultBalance = [];

const initialState = {
  currency: [],
  currencyLoading: false,
  error: null
};

export default function CurrencyReducer(state = initialState, action) {
  switch (action.type) {
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

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
