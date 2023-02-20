import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { IMAGES, ICONS } from '../../../../common/Images'
import { SIZES, COLORS, STYLES } from '../../../../common/Theme'
import { useRoute } from '@react-navigation/native'
import { HomeContext } from '../../../components/Context/HomeContext'
import { useDispatch, useSelector } from 'react-redux'
import { orderFoodItem } from '../../../redux/ReduxSlice'
import { useEffect } from 'react'

const Body = () => {
    const route = useRoute()
    const item = route.params.item
    const { detailContext } = useContext(HomeContext)
    const dispatch = useDispatch()
    const [itemFood, setItemFood] = useState({
        id: item.menuId,
        name: item.name,
        price: item.price,
        image: item.photo,
        qty: detailContext.qty
    })
    useEffect(() => {
        dispatch(orderFoodItem(itemFood))
    }, [itemFood])
    if (itemFood.qty !== detailContext.qty) {
        setItemFood({
            ...itemFood,
            qty: detailContext.qty
        })
    }
    return (
        <View>
            <View style={styles.food}>
                <Image
                    style={styles.food_img}
                    resizeMode='cover'
                    source={item.photo} />
                <View style={styles.quantity}>
                    <TouchableOpacity
                        onPress={() => {
                            detailContext.decrease()
                        }}
                    >
                        <Text style={styles.quantity_text__2}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity_text__1}>{detailContext.qty}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            detailContext.increase()
                        }}>
                        <Text style={styles.quantity_text__2}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.food_info}>
                <Text style={styles.food_name_text}>{item.name} - ${item.price}</Text>
                <Text style={styles.food_desc_text}>{item.description}</Text>
                <View style={styles.food_calo}>
                    <Image
                        resizeMode='cover'
                        style={styles.food_calo_icon}
                        source={ICONS.fire} />
                    <Text style={styles.food_calo_info}>{item.calories} cal</Text>
                </View>
            </View>
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    food: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding * 1.5
    },
    food_img: {
        width: SIZES.width,
        height: SIZES.height * 0.25,
    },
    quantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        width: 120,
        paddingVertical: 4,
        paddingHorizontal: SIZES.padding * 1.5,
        borderRadius: SIZES.radius,
        position: 'absolute',
        bottom: 0,
        left: '35%',
        ...STYLES.shadow
    },
    quantity_text__1: {
        fontSize: 24,
        fontWeight: '500'
    },
    quantity_text__2: {
        fontSize: 32,
        fontWeight: '600',
        color: COLORS.darkgray
    },
    food_info: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding * 1.5,
        paddingTop: SIZES.padding * 3
    },
    food_name_text: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    food_desc_text: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    food_calo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.padding12
    },
    food_calo_icon: {
        width: 20,
        height: 20
    },
    food_calo_info: {
        paddingLeft: 5,
        fontSize: 16,
        color: COLORS.darkgray
    },
})