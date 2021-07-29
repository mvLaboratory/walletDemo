import {
  LOAD_OPERATIONS_BEGIN,
  LOAD_OPERATIONS_SUCCESS,
  LOAD_OPERATIONS_FAILURE,

  SAVE_OPERATION_BEGIN,
  SAVE_OPERATION_SUCCESS,
  SAVE_OPERATION_FAILURE
} from "../actions/OperationsActions";

const initialState = {
  operations: [],
  operationsLoading: false,
  error: null
};

export default function OperationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OPERATIONS_BEGIN:
      return {
        ...state,
        operationsLoading: true,
        error: null
      };

    case LOAD_OPERATIONS_SUCCESS:
      return {
        ...state,
        operationsLoading: false,
        operations: action.payload.operations
      };
  
    case LOAD_OPERATIONS_FAILURE:
      return {
        ...state,
        operationsLoading: false,
        error: action.payload.error,
        items: []
      };

    case SAVE_OPERATION_BEGIN:
      return {
        ...state,
        operationSavingLoading: true,
        error: null
      };

    case SAVE_OPERATION_SUCCESS:
      return {
        ...state,
        operationSavingLoading: false,
        operationSavingResult: true
      };
  
    case SAVE_OPERATION_FAILURE:
      return {
        ...state,
        operationSavingLoading: false,
        operationSavingResult: false,
        error: action.payload.error
      };

      
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
