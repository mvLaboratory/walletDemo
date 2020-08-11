import {
  LOAD_OPERATION_CATEGORIES_BEGIN,
  LOAD_OPERATION_CATEGORIES_SUCCESS,
  LOAD_OPERATION_CATEGORIES_FAILURE
} from "../actions/OperationCategoriesActions";

const initialState = {
  operationCategories: [],
  operationCategoriesLoading: false,
  error: null
};

export default function OperationCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OPERATION_CATEGORIES_BEGIN:
      return {
        ...state,
        operationCategoriesLoading: true,
        error: null
      };

    case LOAD_OPERATION_CATEGORIES_SUCCESS:
      return {
        ...state,
        operationCategoriesLoading: false,
        operationCategories: action.payload.wallets
      };
  
    case LOAD_OPERATION_CATEGORIES_FAILURE:
      return {
        ...state,
        operationCategoriesLoading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
