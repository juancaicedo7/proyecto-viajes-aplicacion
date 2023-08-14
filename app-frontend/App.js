import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import axios from "axios";
import { UserProvider } from "./src/context/UserContext";

axios.defaults.baseURL = "http://192.168.1.5:4000";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}
