import { GetRequest, PostRequest } from "../shared/serviceUtils";

export function loadOperationCategories(auth) {
  return (dispatch) => {
    dispatch(loadOperationCategoriesBegin());
    return GetRequest("/api/operationCategory", auth)
      .then((response) => {
        return response.data;
      })
      .then((responseData) => {
        dispatch(loadOperationCategoriesSuccess(responseData));
        return responseData;
      })
      .catch((error) => dispatch(loadOperationCategoriesFailure(error)));
  };
}

export function addOperationCategory(category, auth) {
  return (dispatch) => {
    dispatch(addOperationCategoriesBegin());
    return PostRequest("/api/operationCategory", category, auth)
      .then((response) => {
        return response.data;
      })
      .then((responseData) => {
        dispatch(addOperationCategoriesSuccess(responseData));
        return responseData;
      })
      .catch((error) => dispatch(addOperationCategoriesFailure(error)));
  };
}

export const LOAD_OPERATION_CATEGORIES_BEGIN =
  "LOAD_OPERATION_CATEGORIES_BEGIN";
export const LOAD_OPERATION_CATEGORIES_SUCCESS =
  "LOAD_OPERATION_CATEGORIES_SUCCESS";
export const LOAD_OPERATION_CATEGORIES_FAILURE =
  "LOAD_OPERATION_CATEGORIES_FAILURE";

export const ADD_OPERATION_CATEGORIES_BEGIN = "ADD_OPERATION_CATEGORIES_BEGIN";
export const ADD_OPERATION_CATEGORIES_SUCCESS =
  "ADD_OPERATION_CATEGORIES_SUCCESS";
export const ADD_OPERATION_CATEGORIES_FAILURE =
  "ADD_OPERATION_CATEGORIES_FAILURE";

export const loadOperationCategoriesBegin = () => ({
  type: LOAD_OPERATION_CATEGORIES_BEGIN,
});

export const loadOperationCategoriesSuccess = (operationCategoriesList) => ({
  type: LOAD_OPERATION_CATEGORIES_SUCCESS,
  payload: { operationCategoriesList },
});

export const loadOperationCategoriesFailure = (error) => ({
  type: LOAD_OPERATION_CATEGORIES_FAILURE,
  payload: { error },
});

export const addOperationCategoriesBegin = () => ({
  type: ADD_OPERATION_CATEGORIES_BEGIN,
});

export const addOperationCategoriesSuccess = (category) => ({
  type: ADD_OPERATION_CATEGORIES_SUCCESS,
  payload: { category },
});

export const addOperationCategoriesFailure = (error) => ({
  type: ADD_OPERATION_CATEGORIES_FAILURE,
  payload: { error },
});
