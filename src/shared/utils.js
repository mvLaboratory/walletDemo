export const getCurrencyValue = (currencyCollection, currency) => {
  if (!currency || !currencyCollection)
    return 0;
  
  var currencyObj = currencyCollection.find(x => x.currency === currency.id) || {value: 0}             
  return currencyObj.value;
}

export const getCurrencyInfo = (currencyId, currencyList) => {
  const defaultCurrency = {name: ""};
  if (!currencyId || !currencyList)
    return defaultCurrency;

  var currencyObj = currencyList.find(x => x.id === currencyId) || defaultCurrency             
    return currencyObj;
}

export const formatDateString = (dateString) => {
  return dateString ? dateString.slice(0, 19).replace('T', ' ') : "";
}