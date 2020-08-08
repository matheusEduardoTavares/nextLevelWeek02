import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Landing from './src/pages/Landing'
import { AppLoading } from 'expo'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppStack from './src/routes/AppStack';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fontsLoaded){
    return <AppLoading />
  }

  else{
    return (
      // <View style={styles.container}>
      //   <Text style={styles.title}>Hello NLW</Text>
      //   <Text style={styles.title}>Hello NLW 2</Text>
      //   <StatusBar style="auto" />
      // </View>
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
      // Ou usamos o View no lugar do fragment
  
    );
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },

  title: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold'
    // transform: [
    //   { rotateZ: '30deg' }
    // ]
  }
});
*/