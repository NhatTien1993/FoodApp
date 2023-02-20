import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TextInput, Dimensions } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { enableLatestRenderer } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import decodePolyline from 'decode-google-map-polyline';

import { COLORS, STYLES } from '../../../common/Theme';
import { screens, storeData } from '../../../common/Contant';
import { ICONS } from '../../../common/Images';
import { resetRoutes, setData, setDirection, setLocal, setLocation, setMarker } from '../../redux/ReduxSlice';
import { getDirections } from '../../redux/ReduxThunk';
enableLatestRenderer();
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

export default memo(function Map() {
    const dispatch = useDispatch()
    const marker = useSelector((state) => state.redux.marker)
    const local = useSelector((state) => state.redux.local)
    const location = useSelector((state) => state.redux.location)
    const addressList = useSelector((state) => state.redux.addressList)
    const isDirection = useSelector((state) => state.redux.isDirection)
    const data = useSelector((state) => state.redux.data)
    const routes = useSelector((state) => state.redux.routes)
    const [dataPoliline, setDataPoliline] = useState([])
    // future zoom
    const [latDelta, setLatDelta] = useState(0.04)
    const [longDelta, setLongDelta] = useState(0.04)
    let newCoordinates = []
    const _map = useRef()
    const navigation = useNavigation()
    const duration = routes[0]?.legs[0]?.duration.text
    const distance = routes[0]?.legs[0]?.distance.text
    const distanceValue = routes[0]?.legs[0]?.distance.value
    const codePoliline = routes[0]?.overview_polyline?.points
    let i = 0
    const storeCoordi = {
        latitude: storeData.lat,
        longitude: storeData.lng
    }
    const _requestLocal = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 8000,
        })
            .then(location => {
                setMarker({
                    latitude: location.latitude,
                    longitude: location.longitude
                })
                // console.log(location)
            })
            .catch(err => {
                const { code, message } = err
                console.log('Error: ' + message)
            })
    }

    useEffect(() => {
        // console.log(marker)
        if (marker.latitude !== 0) {
            const getLocalName = async () => {
                const resp = await fetch(`https://rsapi.goong.io/Geocode?latlng=${marker.latitude},%20${marker.longitude}&api_key=TrWVkxK7X8BmyuiUuz9NMBpKQKDsBUPeLS7cH9mQ`)
                const json = await resp.json()
                const result = await json.results
                dispatch(setData(result))
            }
            getLocalName()
            if (isDirection) {
                dispatch(getDirections({
                    marker: marker,
                    location: storeCoordi
                }))
            }
            if (addressList.length !== 0) {
                dispatch(setLocal(marker))
            }
        }
    }, [marker])
    useEffect(() => {
        if (!isDirection) {
            dispatch(resetRoutes([]))
            setDataPoliline([])
        }
        if (isDirection) {

        }
    }, [isDirection])
    useEffect(() => {
        if (isDirection) {
            if (distanceValue) {
                setLatDelta(0.007 * (distanceValue / 1000))
                setLongDelta(0.007 * (distanceValue / 1000))
                dispatch(setLocal(newCoordinates[centerIndex]))
                // _animate()
            }
        }
    }, [routes])


    useEffect(() => {
        dispatch(setLocal(storeCoordi))
    }, [])
    var centerIndex
    if (codePoliline) {
        const coordinates = decodePolyline(codePoliline)
        for (var line of coordinates) {
            newCoordinates.push({ latitude: line.lat, longitude: line.lng })
        }
        centerIndex = Math.floor(newCoordinates.length / 2)
    }

    const onZoomIn = () => {
        if (latDelta > 0.0005 || longDelta > 0.0005) {
            setLatDelta(latDelta / 3)
            setLongDelta(longDelta / 3)
        }
    }
    const onZoomOut = () => {
        if (latDelta < 14 || longDelta < 14) {
            setLatDelta(latDelta * 3)
            setLongDelta(longDelta * 3)
        }
    }
    const handleDirection = () => {
        navigation.navigate(screens.cart)

    }
    // console.log(newCoordinates)
    const _provider = Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={_map}
                provider={_provider}
                style={styles.map}
                onPress={(e) => {
                    dispatch(setMarker(e.nativeEvent.coordinate))
                }}
                region={{
                    ...local,
                    latitudeDelta: latDelta,
                    longitudeDelta: longDelta,
                }}
            >
                <Marker
                    draggable
                    coordinate={marker}
                    // title={'abc'}
                    // description={'địa điểm danh dấu'}
                    onDragEnd={(e) => {
                        dispatch(setMarker(e.nativeEvent.coordinate))
                    }}
                >
                    <Callout>
                        <Text>Tên vị trí</Text>
                        <Text>Mô tả vị trí</Text>

                    </Callout>
                </Marker>
                <Polyline coordinates={newCoordinates} strokeColor={COLORS.blueGGPoliline} strokeWidth={7} lineJoin='round' />
            </MapView>
            {!isDirection ? <View style={{ position: "absolute", width: '100%', height: '100%' }}>
                <View
                    style={{
                        backgroundColor: 'white', flexDirection: 'row', marginHorizontal: 20,
                        marginTop: Platform.OS === 'ios' ? 60 : 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center', ...STYLES.shadow
                    }}>
                    {marker.latitude === 0 ? <TouchableOpacity
                        onPress={() => {

                            navigation.goBack()
                        }}
                        style={{ paddingRight: 5, paddingLeft: 10 }}>
                        <Image
                            resizeMode='cover'
                            style={{ width: 24, height: 24 }}
                            source={ICONS.icBack} />
                    </TouchableOpacity> :
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setMarker({
                                    latitude: 0,
                                    longitude: 0,
                                }))
                                dispatch(setData([]))
                            }}
                            style={{ paddingRight: 5, paddingLeft: 10 }}>
                            <Image
                                resizeMode='cover'
                                style={{ width: 24, height: 24 }}
                                source={ICONS.icClose} />
                        </TouchableOpacity>}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { navigation.navigate(screens.search_map) }}
                        style={{ flex: 1, marginRight: 5 }}>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{ fontSize: 18, fontWeight: '400', color: 'black' }}>{marker.latitude === 0 ? ' Nhập địa chỉ giao hàng' : data[0]?.formatted_address}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={handleDirection}
                        style={{ paddingHorizontal: 12, backgroundColor: data.length === 0 ? COLORS.blueGGUnactive : COLORS.blueGG, paddingVertical: 10, borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
                        <Image
                            source={ICONS.shopping_basket}
                            style={{ width: 20, height: 20, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 50 }}>
                    <TouchableOpacity
                        onPress={_requestLocal}
                        style={{ backgroundColor: 'white', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginRight: 20, marginBottom: 20 }} >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={ICONS.icNearMe} /></TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onZoomIn}
                        style={{ backgroundColor: 'white', width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginRight: 20, marginBottom: 20 }} >
                        <Text style={{ fontSize: 30, fontWeight: '400', color: 'black' }}>+</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={onZoomOut}
                        activeOpacity={0.8}
                        style={{ backgroundColor: 'white', width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginRight: 20, marginBottom: 20 }} >
                        <Text style={{ fontSize: 18, fontWeight: '900', color: 'black', alignSelf: 'center', marginBottom: 12 }}>__</Text></TouchableOpacity>
                </View>
            </View> :
                // Directions
                <View style={{ position: "absolute", width: '100%', height: '100%' }}>
                    <View
                        style={{
                            backgroundColor: 'white', paddingTop: Platform.OS === 'ios' ? 40 : 20, ...STYLES.shadow, zIndex: 1, paddingBottom: 10,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(setDirection(!isDirection))
                                    setDataPoliline([])
                                    if (dataPoliline.length === newCoordinates.length) {
                                    }
                                }}
                                style={{ paddingLeft: 10, alignSelf: 'flex-start', justifyContent: 'center', paddingTop: 8, paddingRight: 5 }}>
                                <Image
                                    resizeMode='cover'
                                    style={{ width: 24, height: 24, }}
                                    source={ICONS.icBack} />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'space-evenly', height: 80, marginRight: 5 }}>
                                <Image
                                    resizeMode='cover'
                                    style={{ width: 20, height: 20, tintColor: COLORS.blueGG }}
                                    source={ICONS.icNearMe} />
                                <Image
                                    resizeMode='cover'
                                    style={{ width: 20, height: 20 }}
                                    source={ICONS.icMoreVert} />
                                <Image
                                    resizeMode='cover'
                                    style={{ width: 20, height: 20, tintColor: 'red' }}
                                    source={ICONS.icPinOn} />

                            </View>
                            <View style={{ flex: 1 }}>
                                <View

                                    style={{
                                        backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 8, marginBottom: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ccc'
                                    }}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>{storeData.nameStore}</Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (dataPoliline.length === newCoordinates.length) {
                                            navigation.navigate(screens.search_map)
                                        }
                                    }}
                                    style={{
                                        backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 8, borderRadius: 5, borderWidth: 1, borderColor: '#ccc'
                                    }}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>{data[0]?.address_components[0].short_name}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                }}
                                style={{ paddingHorizontal: 10 }}>
                                <Image
                                    resizeMode='cover'
                                    style={{ width: 24, height: 24 }}
                                    source={ICONS.icSwap} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                            <Image
                                style={{ width: 24, height: 24, tintColor: COLORS.blueGG }}
                                source={ICONS.icMotorbike} />
                            <Text style={{ color: COLORS.blueGG, marginLeft: 10 }}>{`${duration}`}</Text>
                            <Text style={{ color: COLORS.darkgray }}>{` (${distance})`}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 50 }}>
                        <TouchableOpacity
                            onPress={_requestLocal}
                            style={{ backgroundColor: 'white', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginRight: 20, marginBottom: 20 }} >
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={ICONS.icNearMe} /></TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onZoomIn}
                            style={{ backgroundColor: 'white', width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginRight: 20, marginBottom: 20 }} >
                            <Text style={{ fontSize: 30, fontWeight: '400', color: 'black' }}>+</Text></TouchableOpacity>
                        <TouchableOpacity
                            onPress={onZoomOut}
                            activeOpacity={0.8}
                            style={{ backgroundColor: 'white', width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginRight: 20, marginBottom: 20 }} >
                            <Text style={{ fontSize: 18, fontWeight: '900', color: 'black', alignSelf: 'center', marginBottom: 12 }}>__</Text></TouchableOpacity>
                    </View>
                </View>
            }

        </View>
    )
})
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%'
    },
});