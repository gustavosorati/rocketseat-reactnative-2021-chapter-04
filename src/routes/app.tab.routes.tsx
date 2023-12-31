import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';

import HomeSvg from '../assets/home.svg'
import PeopleSvg from '../assets/people.svg'
import CarSvg from '../assets/car.svg'
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

type TabParamsList = {
  Splash: undefined;
  Inicio: undefined;
  Profile: undefined;
  MyCars: undefined;
}

export type TabParams = BottomTabNavigationProp<TabParamsList>

export function AppTabRoutes() {
  const theme = useTheme();
  const {Navigator, Screen} = createBottomTabNavigator<TabParamsList>();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        }
      }}

    >
      <Screen name="Inicio" component={AppStackRoutes}
        options={{
          tabBarIcon: ({color}) => <HomeSvg width={24} height={24}  fill={color} />
        }}
      />
      <Screen name="Profile" component={Home}
        options={{
          tabBarIcon: ({color}) => <PeopleSvg width={24} height={24}  fill={color} />
        }}
      />
      <Screen name="MyCars" component={MyCars}
        options={{
          tabBarIcon: ({color}) => <CarSvg width={24} height={24}  fill={color} />
        }}
      />
    </Navigator>
  );
}
