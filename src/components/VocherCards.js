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
import FeatherIcon from 'react-native-vector-icons/Feather';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import vochers from '../data/Vouchers';
import { useNavigation } from '@react-navigation/native';
const VocherCards = () => {
  const navigation = useNavigation()
  const [vochersData, setVocherData] = useState([]);
  useEffect(() => {
    fetchVochers();
  }, []);
  const fetchVochers = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3001/vouchers/getAllVoucherByProvider?pid=6669b62a31f4397f830795b7',
        requestOptions,
      );

      const result = await response.json();
      console.log(result.result, '========================vocher data');
      setVocherData(result.result);
    } catch (error) {
      console.log(error, '-==========error');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={vochersData}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {}}
        renderItem={({item}) => {
          return (
            <View style={styles.productCard}>
              <Image
                source={{
                  uri: item.activeImage
                    ? `https://www.mein-vendoapp.de:3001${
                        item.activeImage.startsWith('/')
                          ? item.activeImage
                          : '/' + item.activeImage
                      }`
                    : 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg',
                }}
                style={styles.image}
              />
              <View style={{flex: 1, marginVertical: 5}}>
                <Text style={styles.ItemName}>{item.title}</Text>
                <Text style={styles.itemShortDescription}>
                  {item.shortDescription}
                </Text>
                <Text style={styles.price}>Quantity:{item.quantity}</Text>
                <View>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() =>
                      navigation.navigate('editvoucher', {item})
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
    </View>
  );
};

export default VocherCards;

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
