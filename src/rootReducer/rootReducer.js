import userReducer from '../reducers/userReducer'
import customersReducer from '../reducers/customersReducer'
import departmentsReducer from '../reducers/departmentsReducer'
import employeesReducer from '../reducers/employeesReducer'
import ticketsReducer from '../reducers/ticketsReducer'
import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

/*const persistConfig={
    key:'root',
    storage,
    stateReconciler:hardSet
    //whiteList:['user','customers','departments','employees','tickets']
}*/

 const rootReducer=combineReducers({
    user:userReducer,
    customers:customersReducer,
    departments:departmentsReducer,
    employees:employeesReducer,
    tickets:ticketsReducer
})

export default rootReducer