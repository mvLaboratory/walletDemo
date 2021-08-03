import { GetRequest, PostRequest, PutRequest } from "../shared/serviceUtils";

export function loadOperations(auth, filters) {
  return dispatch => {
    dispatch(loadOperationsBegin());
    return GetRequest("/api/operations/List", auth, { "Content-Type": "application/json; charset=utf-8" }, {limit: 25, offset: 0, sortColumn: "date", sortDirection: 2, filters: filters})
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(loadOperationsSuccess(responseData));
        return responseData;
      })
      .catch(error => dispatch(loadOperationsFailure(error)));
  };
}

export function saveOperation(operation, auth) {
  return dispatch => {
    dispatch(saveOperationBegin());
    return (operation.id 
        ? PutRequest(`/api/operations/${operation.id}`, operation, auth) 
        : PostRequest("/api/operations", operation, auth))
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(saveOperationSuccess(responseData));
        return responseData;
      })
      .then(responseData => {
        dispatch(saveOperationFinished());
        return responseData;
      })
      .catch(error => { 
        dispatch(saveOperationsFailure(error)) 
      });
  };
}

export const LOAD_OPERATIONS_BEGIN = "LOAD_OPERATIONS_BEGIN";
export const LOAD_OPERATIONS_SUCCESS = "LOAD_OPERATIONS_SUCCESS";
export const LOAD_OPERATIONS_FAILURE = "LOAD_OPERATIONS_FAILURE";

export const SAVE_OPERATION_BEGIN = "SAVE_OPERATION_BEGIN";
export const SAVE_OPERATION_SUCCESS = "SAVE_OPERATION_SUCCESS";
export const SAVE_OPERATION_FINISHED = "SAVE_OPERATION_FINISHED";
export const SAVE_OPERATION_FAILURE = "SAVE_OPERATION_FAILURE";


export const loadOperationsBegin = () => ({
  type: LOAD_OPERATIONS_BEGIN
});

export const loadOperationsSuccess = (operations) => ({
  type: LOAD_OPERATIONS_SUCCESS,
  payload: {operations}
});

export const loadOperationsFailure = error => ({
  type: LOAD_OPERATIONS_FAILURE,
  payload: { error }
});


export const saveOperationBegin = () => ({
  type: SAVE_OPERATION_BEGIN
});

export const saveOperationSuccess = (operationData) => ({
  type: SAVE_OPERATION_SUCCESS,
  payload: {operationData}
});

export const saveOperationFinished = () => ({
  type: SAVE_OPERATION_FINISHED,
  payload: {}
});

export const saveOperationsFailure = error => ({
  type: SAVE_OPERATION_FAILURE,
  payload: { error }
});