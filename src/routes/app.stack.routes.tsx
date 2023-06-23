import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { CarDTO } from '../dtos/CarDTO';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../screens/Confirmation';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: {
    car: CarDTO
  };
  Scheduling: {
    car: CarDTO
  };
  SchedulingDetails: {
    car: CarDTO,
    dates: string[]
  };
  SchedulingComplete: undefined;
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: string;
  };
  MyCars: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpSecondStep: {
    user: {
      name: string;
      email: string;
      driverLicense: number;
    }
  }
}

export type StackParamList = NativeStackNavigationProp<RootStackParamList>

export function AppStackRoutes() {
  const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
    >
      <Screen name="Home" component={Home} options={{
        gestureEnabled: false
      }} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
