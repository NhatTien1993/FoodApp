import { createSlice } from '@reduxjs/toolkit'
import { getAddress, getDirections } from './ReduxThunk'

const foodApp = createSlice({
    name: 'foodApp',
    initialState: {
        isLoadding: false,
        search: '',
        addressList: [],
        marker: {
            latitude: 0,
            longitude: 0,
        },
        local: {
            latitude: 0,
            longitude: 0
        },
        isDirection: false,
        routes: [],
        location: {
            latitude: 10.874066703929872,
            longitude: 106.76790911704302
        },
        orderList: [],
        orderItem: {},
        data: []
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setMarker: (state, action) => {
            state.marker = action.payload
        },
        setLocal: (state, action) => {
            state.local = action.payload
        },
        setDirection: (state, action) => {
            state.isDirection = action.payload
        },
        resetRoutes: (state, action) => {
            state.routes = action.payload
        },
        setLocation: (state, action) => {
            state.location = action.payload
        },
        orderFoodItem: (state, action) => {
            state.orderItem = action.payload
        },
        orderFoodList: (state, action) => {
            state.orderList = action.payload
        },




    },
    extraReducers: builder => {
        builder.addCase(getAddress.pending, (state, action) => {
            state.isLoadding = true
        }).addCase(getAddress.fulfilled, (state, action) => {
            state.isLoadding = false
            state.addressList = action.payload
        })
            //getDirections
            .addCase(getDirections.pending, (state, action) => {
                state.isLoadding = true
            }).addCase(getDirections.fulfilled, (state, action) => {
                state.isLoadding = false
                state.routes = action.payload
            })
    }
})

export const { setData, orderFoodItem, orderFoodList, setLocation, resetRoutes, setDirection, setSearch, setMarker, setLocal } = foodApp.actions

export default foodApp.reducer
