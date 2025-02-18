import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VocherCards from '../components/VocherCards';
const VouchersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <VocherCards />
      <TouchableOpacity
        style={styles.PlusIcon}
        onPress={() => navigation.navigate('addvocherform')}>
        <AntDesign name="plus" size={20} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default VouchersScreen;

const styles = StyleSheet.create({
  PlusIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0090FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
