import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import React,{useContext} from 'react';
import {SIZES, COLORS, STYLES} from '../../../../common/Theme';
import { HomeContext } from '../../../components/Context/HomeContext';

const RenderCategoryItem = ({item}) => {
   const {idMenu,_onPressLike}=useContext(HomeContext)
  
  return (
    <TouchableOpacity
      onPress = {()=> _onPressLike(item.id)}
      style={[styles.category, idMenu === item.id ? styles.category__selected: '']}
      key={item.id}>
      <View style={styles.category_img} key={item.id}>
        <Image style={styles.category_img_icon} source={item.icon} />
      </View>
      <Text style={styles.category_name}>{item.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  category: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2.5,
    backgroundColor: COLORS.white,
    marginRight: SIZES.padding * 2,
    alignItems: 'center',
    ...STYLES.shadow,
    borderRadius: SIZES.radius * 2,
  },
  category_img: {
    backgroundColor: COLORS.lightGray,
    width: 60,
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  category_img_icon: {
    width: 32,
    height: 32,
  },
  category_name: {
    fontSize: 14,
    fontWeight: '500',
  },
  category__selected: {
    backgroundColor: COLORS.primary,
  },

  category_name__selected: {
    color: COLORS.white,
  },
});
export default RenderCategoryItem;
