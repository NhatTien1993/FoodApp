import { View, TouchableOpacity, StyleSheet, Text, Image, Platform } from 'react-native'
import React, { memo, useState } from 'react'
import { COLORS } from '../../../../common/Theme'
import { ICONS } from '../../../../common/Images'
import { useNavigation } from '@react-navigation/native'
import { screens } from '../../../../common/Contant'
import { useSelector } from 'react-redux'

export default memo(function Appbar() {
  const navigation = useNavigation()
  const data = useSelector((state) => state.redux.data)
  return (
    <View>
      <View style={styles.appbar}>
        <TouchableOpacity onPress={() => { navigation.navigate(screens.home) }}>
          <Image style={{ width: 24, height: 24 }} source={ICONS.icBack} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate(screens.map) }}>
          <Image style={{ width: 24, height: 24 }} source={ICONS.icMap} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginHorizontal: 15, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold' }}>{`Delivery: `}</Text>
        <Text numberOfLines={2} style={{ flex: 1, fontSize: 16, color: COLORS.black }}>{data[0]?.formatted_address}</Text>
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  icon: {
    width: 24,
    height: 24
  },
  icon16: {
    width: 16,
    height: 16
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: Platform.OS === 'ios' ? 55 : 20
  }
})
