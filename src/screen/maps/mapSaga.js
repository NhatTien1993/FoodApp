import { takeEvery } from 'redux-saga/effects'
import { setSearch } from '../../redux/ReduxSlice'

export function* log(action) {
    console.log('Log:', action)
}

export default function* mapSaga() {
    console.log('map saga')
    // yield takeEvery('foodApp/setSearch', log) // theo dõi 1 action và thực thi gì đó.. Cách 1
    yield takeEvery(setSearch().type, log) // theo dõi 1 action và thực thi gì đó.. Cách 2
}
