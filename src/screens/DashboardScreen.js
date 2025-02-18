import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {hp, wp} from '../constants/scale';
import FeatherIcon from 'react-native-vector-icons/Feather';
import pages from '../data/pages';
import {useNavigation} from '@react-navigation/native';
import { fonts } from '../constants/fonts';
const DashboardScreen = () => {
  const navigation = useNavigation();
  const handleNavigation = (title) => {
    switch (title) {
      case 'Products':
        navigation.navigate('products');
        break;
      case 'Bonus Cards':
        navigation.navigate('bonuscard');
        break;
      case 'Availbility':
        navigation.navigate('availibilty');
        break;
      case 'Vouchers':
        navigation.navigate('Vouchers');
        break;
      case 'Shop Info':
        navigation.navigate('shopinfo');
        break;
      default:
        console.log('Screen not found');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2)}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.profileIcon}
            />
            <View>
              <Text style={styles.helloText}>Hello, Aftaab</Text>
              <Text style={styles.managementText}>Management</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <FeatherIcon name="log-out" size={24} color="red" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={pages}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.itemCard} onPress={() => handleNavigation(item.title)}>
            <Image source={item.image} style={styles.imageCard} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
           <View style={{padding:7, marginRight:10, alignSelf: 'center',  borderRadius:20, borderWidth:1, }} >
            <FeatherIcon
              name="chevron-right"
              size={24}
              color="#555"
              style={styles.chevronIcon}
            />
            </View>
           
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: hp(12),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  profileIcon: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  helloText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  managementText: {
    fontSize: 14,
    color: '#777',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  logoutText: {
    fontSize: 14,
    color: 'red',
  },
  listContainer: {
    paddingBottom: hp(10),
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor:"#0003",
    borderWidth:1,
    marginVertical: 8,
    justifyContent:"space-between",
    width: wp(96),
    alignSelf: 'center',
  },
  imageCard: {
    width: wp(30),
    height: hp(10)-2,
    borderTopLeftRadius:12,
    borderBottomLeftRadius:12,
    
  },
  textContainer: {
    padding:12,
    flex:1,
   
  },
  title: {
    fontSize: 16,
    fontFamily:fonts.PoppinsBold,
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    fontFamily:fonts.PoppinsMedium,
    color: '#666',
  },
  chevronIcon: {
    alignSelf: 'center',
  },
});
