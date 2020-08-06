import {
  LOAD_CURRENCY_BEGIN,
  LOAD_CURRENCY_SUCCESS,
  LOAD_CURRENCY_FAILURE,
  ADD_CURRENCY_BEGIN,
  ADD_CURRENCY_SUCCESS,
  ADD_CURRENCY_FAILURE
} from "../actions/CurrencyActions";

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


      case ADD_CURRENCY_BEGIN:
        return {
          ...state,
          currencyAdding: true,
          error: null
        };
  
      case ADD_CURRENCY_SUCCESS:
        return {
          ...state,
          currencyAdding: false,
          currencyAddingResult: true
        };
    
      case ADD_CURRENCY_FAILURE:
        return {
          ...state,
          currencyAdding: false,
          currencyAddingResult: false,
          error: action.payload.error,
        };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
