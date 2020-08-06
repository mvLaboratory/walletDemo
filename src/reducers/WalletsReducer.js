import {
  LOAD_WALLETS_BEGIN,
  LOAD_WALLETS_SUCCESS,
  LOAD_WALLETS_FAILURE
} from "../actions/WalletsActions";

const initialState = {
  wallets: [],
  walletsLoading: false,
  error: null
};

export default function WalletsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WALLETS_BEGIN:
      return {
        ...state,
        walletsLoading: true,
        error: null
      };

    case LOAD_WALLETS_SUCCESS:
      return {
        ...state,
        walletsLoading: false,
        wallets: action.payload.wallets
      };
  
    case LOAD_WALLETS_FAILURE:
      return {
        ...state,
        walletsLoading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
