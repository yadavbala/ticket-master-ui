import {persistStore} from 'redux-persist'
import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../rootReducer/rootReducer'

//const middleware=[logger]

    export const  store = createStore(rootReducer,applyMiddleware(thunk))
    //export const  persistor = persistStore(store)
   
  