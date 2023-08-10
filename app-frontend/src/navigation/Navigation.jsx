import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { UseUser } from "../hooks/UseUser";


const Stack = createNativeStackNavigator()

export const Navigation = () => {

    const {isLogin} = UseUser();

    const PrivateRoutes = (screen) => {
        return isLogin ? screen:LoginScreen
      }
    
      const PublicRoutes = (screen) => {
        return isLogin ? HomeScreen:screen
      }

    return (
        <Stack.Navigator
            screenOptions = {{
                headerShown : false,
                contentStyle: {
                    paddingHorizontal: SPACING * 2,
                    flex: 1,
                    backgroundColor: colors.black,
                  },
            }}
            >
            <Stack.Screen name="Login" component={PublicRoutes(LoginScreen)}/>
            <Stack.Screen name="Register" component={PublicRoutes(RegisterScreen)}/>
            <Stack.Screen name="HomeScreen" component={PrivateRoutes(HomeScreen)}/>
            <Stack.Screen name="DetailScreen" component={PrivateRoutes(DetailScreen)}/>
        </Stack.Navigator>
    )
}