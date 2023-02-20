import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { ICONS } from '../../../../common/Images';
import { SIZES, COLORS, STYLES } from '../../../../common/Theme';
import { menuData, categoryData } from '../../../../common/Contant';
import { HomeContext } from '../../../components/Context/HomeContext';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../../common/Contant';

const Menu = () => {
  return <MenuList />;
};

export default Menu;

const MenuList = () => {
  const navigation = useNavigation()
  const { idMenu } = useContext(HomeContext)
  const [like, setLike] = useState([])
  const _onPressLike = (menuId) => {
    let isLike = like.includes(menuId)
    if (isLike) {
      like.splice(like.indexOf(menuId), 1)
      setLike([...like])
    } else {

      setLike([...like, menuId])
    }
  }

  const renderItem = ({ item }) => {
    const category = categoryData.filter((value) => {
      return value.id === item.categoryId
    })
    let name = ''
    category.forEach((value) => {
      name += value.name
    })
    if (idMenu === item.categoryId) {
      return (
        <View style={styles.menu}>
          <TouchableOpacity 
          onPress={()=> {navigation.navigate(screens.detail,{item})}}>
            <ImageBackground
              resizeMode="cover"
              source={item.photo}
              style={styles.menu_img}
              imageStyle={{
                borderRadius: SIZES.radius,
              }}>
              <View style={styles.menu_duration}>
                <Text style={styles.menu_duration_text}>{item.duration}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={styles.menu_name}>{item.name}</Text>
          <View style={styles.menu_info}>
            <TouchableOpacity
              onPress={() => _onPressLike(item.menuId)}
            >
              <Image style={[{ width: 24, height: 24 }, like.includes(item.menuId) ? '' : { tintColor: COLORS.secondary }]} source={ICONS.star} />
            </TouchableOpacity>
            <Text style={styles.menu_info_star}>{item.star}</Text>
            <Text
              style={[styles.menu_info_text, { paddingLeft: SIZES.padding12 }]}>
              {name}
            </Text>
            <View style={styles.menu_info_text__dot}></View>
            <Text style={styles.menu_info_text}>$</Text>
            <Text style={[styles.menu_info_text, styles.menu_info_text__blur]}>
              $
            </Text>
            <Text style={[styles.menu_info_text, styles.menu_info_text__blur]}>
              $
            </Text>
          </View>
        </View>
      );
    }
  };

  return <FlatList data={menuData} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  menu: {
    padding: SIZES.padding12,
  },
  menu_img: {
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  menu_duration: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding12,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    ...STYLES.shadow,
  },
  menu_duration_text: {
    fontSize: 16,
    fontWeight: '600',
  },
  menu_name: {
    fontSize: 30,
    fontWeight: '600',
    paddingVertical: SIZES.padding,
  },
  menu_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu_info_star: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 8,
  },
  menu_info_text: {
    fontSize: 16,
    fontWeight: '600',
  },
  menu_info_text__dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.darkgray,
    borderRadius: 5,
    marginHorizontal: SIZES.padding,
  },
  menu_info_text__blur: {
    opacity: 0.3,
  },
});
