import { createAsyncThunk } from '@reduxjs/toolkit'

const apiMapKey = 'TrWVkxK7X8BmyuiUuz9NMBpKQKDsBUPeLS7cH9mQ'

export const getAddress = createAsyncThunk(
    'address',
    async (params) => {
        // console.log('encodeSearch')
        const resp = await fetch(`https://rsapi.goong.io/geocode?address=${params}&api_key=${apiMapKey}`)
        const json = await resp.json()
        const result = await json.results
        return result
    }
)
export const getDirections = createAsyncThunk(
    'directions',
    async (params) => {
        // console.log(params)
        const resp = await fetch(`https://rsapi.goong.io/Direction?origin=${params.location.latitude},${params.location.longitude}&destination=${params.marker.latitude},${params.marker.longitude}&vehicle=car&api_key=${apiMapKey}`)
        const json = await resp.json()
        const routes = await json.routes
        return routes
    }
)