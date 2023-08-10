import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { SPACING } from "../config/Spacing";
import { colors } from "../config/Colors";


const Stack = createNativeStackNavigator()

export const Navigation = () => {

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
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="DetailScreen" component={DetailScreen}/>
        </Stack.Navigator>
    )
}