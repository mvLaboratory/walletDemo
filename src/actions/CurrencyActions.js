import axios from "axios";

export function loadCurrency() {
  return dispatch => {
    dispatch(loadCurrencyBegin());
    return axios
      .get("http://localhost:30001/currency")
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

export const LOAD_CURRENCY_BEGIN = "LOAD_CURRENCY_BEGIN";
export const LOAD_CURRENCY_SUCCESS = "LOAD_CURRENCY_SUCCESS";
export const LOAD_CURRENCY_FAILURE = "LOAD_CURRENCY_FAILURE";


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