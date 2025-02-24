import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ProductsScreen from '../screens/ProductsScreen';
import BonusCardScreen from '../screens/BonusCardScreen';
import AvailibiltyScreen from '../screens/AvailibiltyScreen';
import VouchersScreen from '../screens/VouchersScreen';
import ShopInfoScreen from '../screens/ShopInfoScreen';
import AddProductForm from '../screens/AddProductForm';
import EditProductForm from '../screens/EditProductForm';
import AddVocherForm from '../screens/AddVocherForm';
import EditVocherForm from '../screens/EditVocherForm';
import AddBonusForm from '../screens/AddBonusForm';
import EditBonusCard from '../screens/EditBonusForm';
import ContentManagement from '../screens/ContentManagement';
import ContentManagementForm from '../screens/ContentManagementForm';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor:"#fff",
      headerStyle:{
        backgroundColor:"#0090FF",        
      }
    }} >
      <Stack.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="products"
        component={ProductsScreen}
        options={{
          headerBackTitle:"",
          title: 'Products',
        }}
      />
      <Stack.Screen name="bonuscard" component={BonusCardScreen} />
      <Stack.Screen name="availibilty" component={AvailibiltyScreen}  options={{title: 'Availibilty'}} />
      <Stack.Screen name="Vouchers" component={VouchersScreen} />
      <Stack.Screen name="shopinfo" component={ShopInfoScreen} />
      <Stack.Screen
        name="addformproduct"
        component={AddProductForm}
        options={{title: 'Add Product'}}
      />
      <Stack.Screen
        name="editproductform"
        component={EditProductForm}
        options={{title: ''}}
      />
      <Stack.Screen
        name="addvocherform"
        component={AddVocherForm}
        options={{title: ''}}
      />
      <Stack.Screen
        name="editvoucher"
        component={EditVocherForm}
        options={{title: ''}}
      />
       <Stack.Screen
        name="addbonusform"
        component={AddBonusForm}
        options={{title: ''}}
      />
       <Stack.Screen
        name="editbonuscard"
        component={EditBonusCard}
        options={{title: ''}}
      />
       <Stack.Screen
        name="contentmanagement"
        component={ContentManagement}
        options={{title: ''}}
      />
       <Stack.Screen
        name="contentmanagementform"
        component={ContentManagementForm}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
