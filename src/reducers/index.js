import { combineReducers } from "redux";
import BalanceReducer from "./BalanceReducer";
import CurrencyReducer from "./CurrencyReducer";
import WalletsReducer from "./WalletsReducer";
import OperationCategoryReducer from "./OperationCategoryReducer";
import OperationsReducer from "./OperationsReducer";

export default combineReducers({
  BalanceReducer,
  CurrencyReducer,
  WalletsReducer,
  OperationCategoryReducer,
  OperationsReducer,
});
