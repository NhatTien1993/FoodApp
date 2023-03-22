import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS, SIZES, STYLES } from '../../../../common/Theme';
import { ICONS } from '../../../../common/Images';
import { useDispatch, useSelector } from 'react-redux';
import { orderFoodList, setDirection } from '../../../redux/ReduxSlice';
import { useNavigation } from '@react-navigation/native';
import { screens, storeData } from '../../../../common/Contant';
import { getDirections } from '../../../redux/ReduxThunk';

const MyCart = () => {
    const dispatch = useDispatch()
    const orderList = useSelector((state) => state.redux.orderList)
    const isDirection = useSelector((state) => state.redux.isDirection)
    const marker = useSelector((state) => state.redux.marker)
    const data = useSelector((state) => state.redux.data)
    const navigation = useNavigation()
    const storeCoordi = {
        latitude: storeData.lat,
        longitude: storeData.lng
    }
    const handleDeleteOrderItem = (index) => {
        let newArr = [...orderList]
        newArr.splice(index, 1)
        dispatch(orderFoodList([...newArr]))
    }
    const handleIncreQuantity = (id) => {
        const updateOrderList = orderList.map((item, index) => {
            if (index === id) {
                return {
                    ...item,
                    quantity: item.qty += 1
                }
            } else {
                return item
            }

        })
        dispatch(orderFoodList(updateOrderList))
    }
    const handleDecreQuantity = (id) => {
        let updateOrderList = orderList.map((item, index) => {
            if (index === id) {
                if (item.qty > 1) {
                    return {
                        ...item,
                        qty: item.qty -= 1
                    }
                } else {
                    alert('Trượt sang trái để xoá sp')
                    return item
                }
            } else {
                return item
            }
        })
        dispatch(orderFoodList(updateOrderList))
    }
    const totalPay = orderList.reduce((total, item) => {
        return total += (item?.price * item?.qty)
    }, 0)
    const handleCheckout = () => {
        // Call API or any...
        if (data.length === 0) {
            alert('Vui lòng chọn địa chỉ giao hàng')
        } else if (orderList.length === 0) {
            alert('Vui lòng chọn món ăn')
        } else {
            navigation.navigate(screens.map)
            dispatch(setDirection(!isDirection))
            dispatch(getDirections({
                marker: marker,
                location: storeCoordi
            }))

            dispatch(orderFoodList([]))
        }
    }
    console.log(data)
    const ItemCart = ({ item, index }) => {
        return (
            <View
                key={item?.id}
                style={{ backgroundColor: COLORS.white, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginBottom: 20, height: 100, ...STYLES.shadow }}>
                <Image
                    style={{ width: 100, height: 100, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}
                    source={item.image} />
                <View style={{ flex: 1, paddingLeft: 15, paddingRight: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.black }}>{item.name}</Text>

                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.black, paddingTop: 8 }}>{`Price: $${item.price}`}</Text>
                </View>
                <View style={{ alignItems: 'center', paddingRight: 10 }}>
                    <TouchableOpacity
                        style={{ padding: 5 }}
                        onPress={() => { handleDecreQuantity(index) }}
                    >
                        <View

                            style={{ padding: 3 }}><Image
                                style={{ width: 20, height: 20, backgroundColor: COLORS.bcground, borderRadius: 5 }}
                                source={ICONS.icMinus} /></View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: COLORS.black, }}>{item.qty}</Text>
                    <TouchableOpacity
                        style={{ padding: 5 }}
                        onPress={() => { handleIncreQuantity(index) }}
                    >
                        <View

                            style={{ padding: 3 }}><Image
                                style={{ width: 20, height: 20, backgroundColor: COLORS.black, borderRadius: 5, tintColor: COLORS.white }}
                                source={ICONS.icAdd} /></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.black, paddingBottom: 15, paddingLeft: 15, marginTop: -10 }}>My Cart</Text>
            <View style={{ flex: 1, padding: 15 }}>
                {(false) ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: '500', color: COLORS.black, opacity: 0.6 }}>Giỏ hàng chưa có sản phẩm nào</Text>
                    </View>
                    :
                    <SwipeListView
                        data={orderList}
                        renderItem={(data, rowMap) => <ItemCart item={data.item} index={data.index} />}
                        rightOpenValue={-60}
                        renderHiddenItem={(data, rowMap) => {
                            const index = data.index
                            return <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { handleDeleteOrderItem(index) }}
                                style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: COLORS.black, height: 100, borderRadius: 10, width: '50%', alignSelf: 'flex-end', paddingRight: 13, opacity: 0.9 }}>
                                <Image
                                    style={{ width: 32, height: 32, tintColor: COLORS.primary, opacity: 0.8 }}
                                    source={ICONS.icDelete} />
                            </TouchableOpacity>
                        }}

                    />
                }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: '500', color: COLORS.darkgray }}>Total</Text>
                <Text style={{ fontSize: 24, fontWeight: '500', color: COLORS.black }}>{`$${totalPay}`}</Text>
            </View>
            <TouchableOpacity
                onPress={handleCheckout}
                style={{ marginBottom: 20, marginHorizontal: 15, backgroundColor: COLORS.black, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>Proceed to checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MyCart