
import { configureStore } from '@reduxjs/toolkit'
import FoodApp from './src/redux/ReduxSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/redux/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        redux: FoodApp
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export default store