import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import Header from './components/Header';
import Categories from './components/Categories';
import Menu from './components/Menu';
import { COLORS } from '../../../common/Theme';

const HomePage = () => {
  const [idLike, setIdLike] = useState(1)
  const _onPressLike = (id) => {
    setIdLike(id)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Categories id={idLike} _onpress={_onPressLike} />
      <Menu id={idLike} />
    </SafeAreaView>
  );
};

export default HomePage;
