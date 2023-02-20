import React, { useState, createContext } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [idMenu, setIdMenu] = useState(1);
  const _onPressLike = (id) => {
    setIdMenu(id);
  }
  const [qty, setQty] = useState(1)
  const incItems = () => {
    setQty(pre => pre + 1)
  }
  const decItems = () => {
    if (qty > 1) {
      setQty(pre => pre - 1)
    }
  }
  const resetQty = () => {
    if (qty !== 1) {
      setQty(1)
    }
  }
  const detailContext = {
    qty,
    increase: incItems,
    decrease: decItems,
    reset: resetQty
  }
  return <HomeContext.Provider value={{ idMenu, _onPressLike, detailContext }}>{children}</HomeContext.Provider>;
};

export { HomeContext, HomeProvider };
