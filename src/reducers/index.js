import { combineReducers } from 'redux'
import BalanceReducer from './BalanceReducer'
import CurrencyReducer from './CurrencyReducer'
import WalletsReducer from './WalletsReducer'


export default combineReducers({
    BalanceReducer,
    CurrencyReducer,
    WalletsReducer
})
