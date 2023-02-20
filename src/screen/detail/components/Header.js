import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { ICONS } from '../../../../common/Images';
import { COLORS, SIZES } from '../../../../common/Theme';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../../../../common/Contant';
import { useContext } from 'react';
import { HomeContext } from '../../../components/Context/HomeContext';

const Header = () => {
  const navigation = useNavigation()
  const { detailContext } = useContext(HomeContext)
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
          detailContext.reset()
        }}
      >
        <Image
          resizeMode="cover"
          source={ICONS.back}
          style={styles.header_img}
        />
      </TouchableOpacity>
      <View style={styles.header_content}>
        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '600' }}>{storeData.addressStore}</Text>
      </View>
      <TouchableOpacity>
        <Image
          resizeMode="cover"
          source={ICONS.list}
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
    width: 24,
    height: 24,
  },
  header_content: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: SIZES.padding,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
    maxWidth: SIZES.width * 0.75
  },
});

export default memo(Header);
