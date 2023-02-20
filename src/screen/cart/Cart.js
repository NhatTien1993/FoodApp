import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from './components/AppBar'
import MyCart from './components/MyCart'

const Cart = () => {
    const dispatch = useDispatch()
    return (
        <View style={{ flex: 1 }}>
            <AppBar />
            <MyCart />
        </View>
    )
}

export default Cart