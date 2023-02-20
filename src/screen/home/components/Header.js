import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ICONS } from '../../../../common/Images';
import { SIZES } from '../../../../common/Theme';
import { screens, storeData } from '../../../../common/Contant';

const Header = () => {
  const navigation = useNavigation()
  const hanldeGoToMap = () => {
    navigation.navigate(screens.map)
  }
  console.log('render HomePage')
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={hanldeGoToMap}>
        <Image
          resizeMode="cover"
          source={ICONS.icMap}
          style={styles.header_img}
        />
      </TouchableOpacity>
      <View style={styles.header_content}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{storeData.nameStore}</Text>
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate(screens.cart) }}>
        <Image
          resizeMode="cover"
          source={ICONS.shopping_basket}
          style={styles.header_img}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding12,
    paddingVertical: SIZES.padding12,
  },
  header_img: {
    width: 26,
    height: 26,
  },
  header_content: {
    backgroundColor: '#F1F1F1',
    paddingVertical: SIZES.padding,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
  },
});

export default memo(Header);
