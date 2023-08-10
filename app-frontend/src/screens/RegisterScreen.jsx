import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function RegisterScreen() {

        const navigation = useNavigation()
      
        // const {register} = useUser()
      
      const [formulario, setFormulario] = useState({
        nombre: "",
        correo:"",
        contrasenia:""
      })
      
      const handleChange = (value, nombre) => {
        setFormulario({...formulario,[nombre]: value})
      }
      
      const handleSubmit = async() => {
        await register(formulario)
      }

  return (
    <View style={styles.container}>
    <Text style={styles.frase}>Regístrate para ver los viajes de tús amigos.</Text>
    <Text style={styles.logo}>ENSIGNA</Text>
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder="Nombre de usuario"
        placeholderTextColor="#c9d1d9"
        onChangeText={value=>handleChange(value, "name")}
        value={formulario.name}
       
      />
    </View>

    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder="Correo electrónico"
        placeholderTextColor="#c9d1d9"
        onChangeText={value=>handleChange(value, "email")}
        value={formulario.email}
        
      />
    </View>
    <View style={styles.inputView}>
      <TextInput
        secureTextEntry
        style={styles.inputText}
        placeholder="Contraseña"
        placeholderTextColor="#c9d1d9"
        onChangeText={value=>handleChange(value, "contrasenia")}
        value={formulario.contrasenia}
       
      />
    </View>
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Text style={styles.register}>Ya tengo una cuenta</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
      <Text style={styles.loginText}>Regístrate</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      // backgroundColor: "#0d1117",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    frase:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        color: "#c9d1d9",
        marginBottom: 40,
    },
  
    logo: {
      fontWeight: "bold",
      fontSize: 30,
      color: "#c9d1d9",
      marginBottom: 40,
    },
  
    inputView: {
      width: "80%",
      backgroundColor: "#161b22",
      borderRadius: 10,
      height: 50,
      marginBottom: 20,
      justifyContent: "center",
      padding: 20,
    },
  
    inputText: {
      height: 50,
      color: "#c9d1d9",
    },
  
    register: {
      color: "#818586",
      fontSize: 11,
    },
  
    loginBtn: {
      width: "80%",
      backgroundColor: "#198DA9",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: 10,
    },
  
    loginText: {
      color: "white",
    },
  });