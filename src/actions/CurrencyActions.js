import axios from "axios";
import { GetRequest } from "../shared/serviceUtils";

export function loadCurrency(auth) {
  return dispatch => {
    dispatch(loadCurrencyBegin());
    return GetRequest("/api/currency", auth)
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(loadCurrencySuccess(responseData));
        return responseData;
      })
      .catch(error => dispatch(loadCurrencyFailure(error)));
  };
}

export function addCurrency(auth) {
  return dispatch => {
    dispatch(addCurrencyBegin());
    return axios
      .post(process.env.REACT_APP_API_PREFIX + "/api/currency")
      .then(response => {
        return response.data;
      })
      .then(responseData => {
        dispatch(addCurrencySuccess(responseData));
        loadCurrency();
        return responseData;
      })
      .catch(error => dispatch(addCurrencyFailure(error)));
  };
}

export const LOAD_CURRENCY_BEGIN = "LOAD_CURRENCY_BEGIN";
export const LOAD_CURRENCY_SUCCESS = "LOAD_CURRENCY_SUCCESS";
export const LOAD_CURRENCY_FAILURE = "LOAD_CURRENCY_FAILURE";

export const ADD_CURRENCY_BEGIN = "ADD_CURRENCY_BEGIN";
export const ADD_CURRENCY_SUCCESS = "ADD_CURRENCY_SUCCESS";
export const ADD_CURRENCY_FAILURE = "ADD_CURRENCY_FAILURE";


export const loadCurrencyBegin = () => ({
  type: LOAD_CURRENCY_BEGIN
});

export const loadCurrencySuccess = (currency) => ({
  type: LOAD_CURRENCY_SUCCESS,
  payload: {currency}
});

export const loadCurrencyFailure = error => ({
  type: LOAD_CURRENCY_FAILURE,
  payload: { error }
});


export const addCurrencyBegin = () => ({
  type: LOAD_CURRENCY_BEGIN
});

export const addCurrencySuccess = (result) => ({
  type: LOAD_CURRENCY_SUCCESS,
  payload: {result}
});

export const addCurrencyFailure = error => ({
  type: LOAD_CURRENCY_FAILURE,
  payload: { error }
});