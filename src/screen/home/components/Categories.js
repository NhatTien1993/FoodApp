import {
  View,
  FlatList,
  Text,
} from 'react-native';
import React from 'react';
import {SIZES} from '../../../../common/Theme';
import {categoryData} from '../../../../common/Contant';
import RenderCategoryItem from './RenderCategoryItem';

const Categories = () => {
  return (
    <View style={{paddingHorizontal :SIZES.padding12}}>
      <Text style={{fontSize: 40, fontWeight: '700',paddingBottom:SIZES.padding}}>Main Categories</Text>
      <CategoryList/>
    </View>
  );
};

const CategoryList = () => 

<FlatList horizontal data={categoryData} 
renderItem={({item}) => (<RenderCategoryItem item={item}/>)} />;

export default Categories;
