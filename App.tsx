import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/screens/Home';
import Setting from './src/screens/Setting';
import { enableScreens } from 'react-native-screens';
import CommonStatusBar from './src/components/CommonStatusBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export type LoggedInParamList = {
  Home: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Member: undefined;
  My: undefined;
  Shopping: undefined;
  Home: undefined;
};


enableScreens();
const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();



function App() {

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <CommonStatusBar />
        <Tab.Navigator
          screenOptions={{
            //  unmountOnBlur: true,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: [
              {
                borderWidth: 1,
                // borderColor: colors.grey_300,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
            ],
            tabBarItemStyle: {},
          }}>
          <Tab.Screen name="Home" component={Home} options={{ title: '홈' }} />
          <Tab.Screen name="Setting" component={Setting} options={{ title: '설정' }} />

        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}



export default App;
