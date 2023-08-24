import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const handleRegister = () =>{
        const user = {
            name: name,
            email:email,
            password:password
        }
        //send A post request to the backend API   IPv4 Address. . . . . . . . . . . : 192.168.1.9
        axios.post("http://192.168.1.9:8000/register",user).then((response)=>{
            console.log(response);
            Alert.alert("Registerration Successfull", "You have regitstered successfully");
            setName("");
            setPassword("");
            setEmail("");
        }).catch((error)=>{
            Alert.alert("Registeration Error","an error occurredd during registration");
            console.log("registration failed1", error);
        })

    };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "while", alignItems: "center" }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-amazon-inkythuatso-2-01-29-14-26-30.jpg"
          }}
        />
      </View>

      <KeyboardAvoidingView>

        <View style={{ alignItems: "center" }}>
          <Text style={{
            fontSize: 17, fontWeight: "bold", marginTop: 12,
            color: "#041E42"
          }}>Register to your Account</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{
            flexDirection: "row", alignItems: "center", gap: 5
            , backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30
          }}>
           <Ionicons name="person" size={24} color="gray" style={{marginLeft: 8}} />
            <TextInput value= {name} onChangeText={(text) => setName(text)}
             
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: name ? 16 : 16 }} placeholder='enter your Name' />
          </View>

        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{
            flexDirection: "row", alignItems: "center", gap: 5
            , backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30
          }}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
            <TextInput value={email} onChangeText={(text) => setEmail(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} placeholder='enter your Email' />
          </View>

        </View>


        


        <View style={{ marginTop: 10 }}>
          <View style={{
            flexDirection: "row", alignItems: "center", gap: 5
            , backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30
          }}>
            <AntDesign name="lock1" size={24} color="gray" style={{ marginLeft: 8 }} />
            <TextInput value={password} onChangeText={(text) => setPassword(text)} 
              secureTextEntry={true}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder='enter your Password' />
          </View>

        </View>

        <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
          <Text> Keep ne logged in</Text>

          <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot Password</Text>
        </View>
        <View style={{ marginTop: 80 }} />

        <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "#FEBE10", 
        borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding:15 }}>
          <Text style={{textAlign:"center",color:"white",fontSize:16,fontWeight:"bold"}}>Register</Text>
        </Pressable>
      </KeyboardAvoidingView>
           
             <Pressable onPress={() => navigation.navigate("Login")} style={{marginTop:15}}>
              <Text style={{textAlign:"center", color:"gray", fontSize:16}}>Already have an account? Sign in</Text>
             </Pressable>

    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})