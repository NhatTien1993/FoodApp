import { all } from 'redux-saga/effects'
import mapSaga from '../screen/maps/mapSaga'

function* helloSaga() {
    console.log('hello saga')
}

export default function* rootSaga() {
    console.log('saga middleware')
    yield all([
        // helloSaga(),
        // mapSaga()
    ])
}