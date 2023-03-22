import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../../common/Theme'
import { ICONS } from '../../../../common/Images'
import { storeData } from '../../../../common/Contant'
import { useDispatch, useSelector } from 'react-redux'
import { orderFoodItem, orderFoodList } from '../../../redux/ReduxSlice'
import { useNavigation } from '@react-navigation/native'
import { HomeContext } from '../../../components/Context/HomeContext'

const Order = () => {
    const dispatch = useDispatch()
    const orderItem = useSelector((state) => state.redux.orderItem)
    const orderList = useSelector((state) => state.redux.orderList)
    const navigation = useNavigation()
    const { detailContext } = useContext(HomeContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)

    useEffect(() => {
        const price = orderList.reduce((total, item) => {
            return total += (item?.price * item?.qty)
        }, 0)
        setTotalPrice(price)
        const qtys = orderList.reduce((total, item) => {
            return total += item?.qty
        }, 0)
        setTotalQty(qtys)
    }, [orderList])
    const handleOrder = () => {
        if (Object.keys(orderItem).length != 0) {
            const isIncludes = orderList.some((item) => item?.id === orderItem.id)
            if (isIncludes) {
                const newList = []
                orderList.forEach((item, index) => {
                    if (item.id !== orderItem.id) {
                        newList.push(item)
                    } else {
                        newList.push({
                            ...item,
                            qty: item.qty + orderItem.qty
                        })
                    }
                })
                dispatch(orderFoodList(newList))

            } else {
                dispatch(orderFoodList([...orderList, orderItem]))
            }
        }
        detailContext.reset()
        navigation.goBack()
    }
    return (
        <View style={styles.order}>
            <View style={styles.order_item}>
                <Text style={styles.order_text1}>{`${totalQty} Items in Cart`}</Text>
                <Text style={styles.order_text1}>{`$${totalPrice}`}</Text>
            </View>
            <View style={styles.order_line}></View>
            <View style={styles.order_item}>
                <View style={styles.order_row}>
                    <Image
                        source={ICONS.pin}
                        style={styles.order_icon} />
                    <Text numberOfLines={1} style={[styles.order_text2, { maxWidth: SIZES.width * 0.45 }]}>{storeData.addressStore}</Text>
                </View>
                <View style={styles.order_row}>
                    <Image
                        source={ICONS.mastercard}
                        style={styles.order_icon} />
                    <Text style={styles.order_text2}>****5586</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={handleOrder}
                    style={styles.order_btn}>
                    <Text style={styles.order_btn_text}>Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    order: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: 15,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius
    },
    order_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding * 2
    },
    order_text1: {
        fontSize: 20,
        fontWeight: '600'
    },
    order_line: {
        borderBottomWidth: 2,
        borderColor: COLORS.lightGray,
        width: '100%',
        marginVertical: SIZES.padding,
    },
    order_row: { flexDirection: 'row' },
    order_icon: {
        width: 20,
        height: 20,
        tintColor: COLORS.darkgray
    },
    order_text2: {
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: SIZES.padding
    },
    order_btn: {
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.padding * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SIZES.padding12,
        borderRadius: 15,
    },
    order_btn_text: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.white
    },
})