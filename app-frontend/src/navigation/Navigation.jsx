import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SuggestionScreen from "../screens/SuggestionScreen";
import ViajeScreen from "../screens/ViajeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";
import { UseUser } from "../hooks/UseUser";
import DetailScreen from "../screens/DetailScreen";


const Stack = createNativeStackNavigator()

export const Navigation = () => {

    const {isLogin} = UseUser();

    const PrivateRoutes = (screen) => {
        return isLogin ? screen:LoginScreen
      }
    
      const PublicRoutes = (screen) => {
        return isLogin ?  SuggestionScreen:screen
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
            <Stack.Screen name="SuggestionScreen" component={PrivateRoutes(SuggestionScreen)}/>
            <Stack.Screen name="ViajeScreen" component={PrivateRoutes(ViajeScreen)}/>
            <Stack.Screen name="DetailScreen" component={PrivateRoutes(DetailScreen)}/>
        </Stack.Navigator>
    )
}