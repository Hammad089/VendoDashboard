import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import {PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor:"#0090FF"}}>
        <PaperProvider>
          <AuthStack />
        </PaperProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
