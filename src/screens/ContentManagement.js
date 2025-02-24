import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ContentManagementPages } from '../data/ContentMangaementPages';
import { hp, wp } from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';
import { fonts } from '../constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const ContentManagement = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={ContentManagementPages}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
              style={styles.card} 
              activeOpacity={0.8} 
              onPress={() => navigation.navigate('contentmanagementform')}
            >
              <Text style={styles.cardText}>{item.title}</Text>
              <Feather name="chevron-right" size={22} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ContentManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  card: {
    backgroundColor: '#0099ef',  
    width: wp(44),  
    height: hp(12), 
    padding: 16,
    borderRadius: 12, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   
  },
  cardText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(12),
    color: '#fff',  
    flex: 1, 
  },
  icon: {
    position:'absolute',
    right:8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',  
    padding: 8,
    borderRadius: 50,
  },
});
