import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../screens/Confirmation';

type AuthParams = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpSecondStep: undefined;
  Confirmation: undefined;
}

export type AuthParamsList = NativeStackNavigationProp<AuthParams>

export function AuthRoutes() {
  const {Navigator, Screen} = createNativeStackNavigator<AuthParams>();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Splash'
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
