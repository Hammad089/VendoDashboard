import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../constants/scale';
import FeatherIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../constants/fonts';
const ProductsScreen = () => {
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    FetchProductList();
  }, []);

  const FetchProductList = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3001/products_mb/getProductsByProvider/?pid=632f5fdef2bf252f6606da04',
        requestOptions,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setProductList(result.result);
    } catch (error) {
      console.log('ERROR to load the api', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={productList}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Product founds</Text>
          </View>
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => {
    
          return (
            <View style={styles.productCard}>
              <Image
                source={{
                  uri: item.productImage
                    ? `https://www.mein-vendoapp.de:3001${
                        item.productImage.startsWith('/')
                          ? item.productImage
                          : '/' + item.productImage
                      }`
                    : 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg',
                }}
                style={styles.image}
              />
              <View style={{flex: 1, marginVertical: 5}}>
                <Text style={styles.ItemName}>{item.name}</Text>
                <Text style={styles.itemShortDescription}>
                  {item.shortDescription}
                </Text>
                <Text style={styles.price}>Price: {item.price}</Text>
                <View>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() =>
                      navigation.navigate('editproductform', {item})
                    }>
                    <Text style={styles.editText}>Edit</Text>
                    <FeatherIcon name="edit" size={13} color={'#0007'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.PlusIcon}
        onPress={() => navigation.navigate('addformproduct')}>
        <AntDesign name="plus" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
    width: wp(96),
    borderWidth: 1,
    borderColor: '#0002',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 10,
  },
  image: {
    width: wp(36),
    height: hp(10),
    borderTopLeftRadius: 10,
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
  },
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
  ItemName: {
    fontSize: RFValue(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: '#000',
    marginBottom: 3,
  },
  itemShortDescription: {
    color: '#0007',
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(9),
    fontWeight: '500',
    marginBottom: 3,
  },
  price: {
    color: 'red',
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(10),
  },
  editBtn: {
    flexDirection: 'row',
    columnGap: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0003',
    width: wp(16),
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    bottom: -10,
  },
  editText: {
    color: '#0007',
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: RFValue(10),
  },
});
