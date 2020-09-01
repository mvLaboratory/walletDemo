import axios from "axios";

export function loadOperationCategories() {
  return dispatch => {
    dispatch(loadOperationCategoriesBegin());
    return axios
      .get("/api/operationCategory")
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(loadOperationCategoriesSuccess(responseData));
        return responseData;
      })
      .catch(error => dispatch(loadOperationCategoriesFailure(error)));
  };
}

export const LOAD_OPERATION_CATEGORIES_BEGIN = "LOAD_OPERATION_CATEGORIES_BEGIN";
export const LOAD_OPERATION_CATEGORIES_SUCCESS = "LOAD_OPERATION_CATEGORIES_SUCCESS";
export const LOAD_OPERATION_CATEGORIES_FAILURE = "LOAD_OPERATION_CATEGORIES_FAILURE";

export const loadOperationCategoriesBegin = () => ({
  type: LOAD_OPERATION_CATEGORIES_BEGIN
});

export const loadOperationCategoriesSuccess = (wallets) => ({
  type: LOAD_OPERATION_CATEGORIES_SUCCESS,
  payload: {wallets}
});

export const loadOperationCategoriesFailure = error => ({
  type: LOAD_OPERATION_CATEGORIES_FAILURE,
  payload: { error }
});