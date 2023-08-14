import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const UserContext = createContext();

const initialState = {
  _id: null,
  nombre: null,
  correo: null,
  token: null,
};

export const UserProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        token
          ? (setToken(token), setIsLogin(true))
          : (setIsLogin(false), setToken(null));
      } catch (error) {
        console.log("error en verify", error.message);
      }
    };
    verify();
  }, []);

  const login = async (formulario) => {
    try {
      const { data } = await axios.post(`/usuarios/acceso`, formulario);
      setToken(data.data.token);
      setUserData(data);
      setIsLogin(true);
      await AsyncStorage.setItem("token", data.data.token);
    } catch (error) {
      if (!error.response.data.ok) {
        return Alert.alert("Error", error.response.data.message);
      }
      console.log("error en login", error.message);
    }
  };

  const register = async (formulario) => {
    try {
      const { data } = await axios.post(`/usuarios/registro`, formulario);
      setToken(data.data.token);
      setUserData(data);
      setIsLogin(true);
      await AsyncStorage.setItem("token", data.data.token);
    } catch (error) {
      if (!error.response.data.ok) {
        return Alert.alert("Error", error.response.data.message);
      }
      console.log("error en login", error.message);
    }
  };

  const exit = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUserData(initialState);
      setIsLogin(false);
      //console.log("estoy cerrando sesion");
    } catch (error) {
      console.log("error en exit", error.message);
    }
  };

  const value = {
    login,
    register,
    exit,
    isLogin,
    userData,
    token,
  };

  return <UserContext.Provider value={value} {...props} />;
};
