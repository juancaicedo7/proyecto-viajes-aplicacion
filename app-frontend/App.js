import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import axios from "axios";
import { UserProvider } from "./src/context/UserContext";
import RegisterScreen from "./src/screens/RegisterScreen";

axios.defaults.baseURL = "http://192.168.1.9:4000";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </UserProvider>
  );
}


