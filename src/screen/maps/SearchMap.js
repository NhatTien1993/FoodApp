import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, memo } from 'react'
import { ICONS } from '../../../common/Images'
import { COLORS, SIZES } from '../../../common/Theme'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setLocal, setMarker, setSearch } from '../../redux/ReduxSlice'
import { getAddress } from '../../redux/ReduxThunk'

const SearchMap = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const input = useRef()
    const search = useSelector((state) => state.redux.search)
    const addressList = useSelector((state) => state.redux.addressList)
    const isLoadding = useSelector((state) => state.redux.isLoadding)
    const SearchItem = ({ item, index }) => {
        const address = item.address_components
        const length = address.length
        const location = item.geometry.location
        let mainAddress = ''
        let auxAddress = ''
        if (length <= 2) {
            address.forEach((item, index) => {
                if (index = 0) {
                    mainAddress = item.short_name
                } else {
                    auxAddress = item.short_name
                }
            })
        } else {
            address.forEach((item, index) => {
                if (index <= 1) {
                    mainAddress += item.short_name + ' '
                } else if (index < (address.length - 1)) {
                    auxAddress += item.short_name + ', '
                } else {
                    auxAddress += item.short_name
                }
            })
        }

        const handleChooseLocation = (e) => {
            dispatch(setMarker({
                latitude: location.lat,
                longitude: location.lng,
            }))
            dispatch(setSearch(''))
            navigation.goBack()
        }
        return (
            <TouchableOpacity
                onPress={handleChooseLocation}
                activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 5, borderRadius: 20, backgroundColor: '#ddd', marginHorizontal: 15 }}>
                    <Image
                        resizeMode='cover'
                        style={{ width: 18, height: 18, tintColor: '#333' }}
                        source={ICONS.pin} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, borderColor: COLORS.darkgray, borderBottomWidth: 0.5, paddingVertical: 10 }}>
                    <View style={{ flexGrow: 1, paddingRight: 5 }}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{ fontSize: 16, color: COLORS.black }}>{mainAddress}</Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{ fontSize: 15 }}>{auxAddress}</Text>
                    </View>
                    <Image resizeMode='cover'
                        style={{ width: 20, height: 20, tintColor: '#333', transform: [{ rotate: '45deg' }], marginHorizontal: 15 }}
                        source={ICONS.back} />
                </View>
            </TouchableOpacity>
        )
    }
    const handleChange = (value) => {
        dispatch(setSearch(value))
    }
    const handleClear = () => {
        dispatch(setSearch(''))
        input?.current?.clear()
    }
    useEffect(() => {
        const encodeSearch = encodeURIComponent(search)
        if (!isLoadding) {
            dispatch(getAddress(encodeSearch))
        }
        // const listAddress = async()=>{
        //     const data = await dispatch(getAddress(encodeSearch))
        // }
        // console.log(encodeSearch)
    }, [search])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 60 : 40, backgroundColor: COLORS.white }}>
                <View style={{}}>
                    <TextInput
                        ref={input}
                        onBlur={() => { Keyboard.dismiss() }}
                        onChangeText={handleChange}
                        autoFocus={true}
                        underlineColorAndroid="transparent"
                        returnKeyType='search'
                        returnKeyLabel={'Tìm'}
                        placeholder='Tìm kiếm ở đây'
                        // value={search}
                        style={{
                            marginHorizontal: 20, borderRadius: 30, paddingVertical: 6, paddingLeft: 40, paddingRight: 45, borderWidth: 0.6, borderColor: COLORS.darkgray, fontSize: 18, fontWeight: '400'
                        }} />
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 9, left: 30 }}
                        onPress={() => { navigation.goBack() }}>
                        <Image
                            resizeMode='cover'
                            style={{ width: 24, height: 24, tintColor: '#333' }}
                            source={ICONS.icBack} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleClear}
                        style={{ borderColor: '#333', borderWidth: 2, borderRadius: 20, position: 'absolute', right: 30, bottom: 9 }}>
                        <Image
                            resizeMode='cover'
                            style={{ width: 18, height: 18, tintColor: '#333' }}
                            source={ICONS.icClose} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ marginVertical: 10 }}>
                    {addressList.map((item, index) => {
                        return <SearchItem item={item} index={index} key={index} />
                    })}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default memo(SearchMap)