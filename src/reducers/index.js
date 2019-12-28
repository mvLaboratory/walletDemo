import { combineReducers } from 'redux'
import BalanceReducer from './BalanceReducer'
import CurrencyReducer from './CurrencyReducer'

export default combineReducers({
    BalanceReducer,
    CurrencyReducer
})
