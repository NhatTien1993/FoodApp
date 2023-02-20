import { SafeAreaView} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import {COLORS} from '../../../common/Theme'
import Header from './components/Header'
import Body from './components/Body'
import Order from './components/Order'

const DetailProduct = () => {

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightGray3}}>
      <Header/>
      <Body/>
      <Order/>
    </SafeAreaView>
    
  )
}

export default DetailProduct
