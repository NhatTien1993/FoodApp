import React from 'react';
import { Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { HomeProvider } from './src/components/Context/HomeContext';
import { RootStackNavigator } from './common/Navigator';
import Map from './src/screen/maps/Map';
import store from './store';

const App = () => {
  return (
    // botton navigation lưu ý ko dùng tham so params
    <Provider store={store}>
      <HomeProvider>
        <NavigationContainer >
          <RootStackNavigator />
        </NavigationContainer>
        {/* <Map /> */}
      </HomeProvider>
    </Provider>
  );
};

export default App;

// Test git branch 