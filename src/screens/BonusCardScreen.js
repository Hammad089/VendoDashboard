import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../constants/scale';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const BonusCardScreen = () => {
  const navigation = useNavigation();
  const [bonusCard, setBonusCard] = useState([]);

  const GetbonusCard = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3103/bc_mb-admin/get_cards_by_provider_id/632f5f00f2bf252f6606b10d',
        requestOptions,
      );
      const result = await response.json();
      setBonusCard(result.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetbonusCard();
  }, [bonusCard]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={bonusCard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.bonusCard}>
            <View style={styles.cardRow}>
              <Image
                source={{uri:item.image}}
                style={styles.image}
                resizeMode="cover"
              />

              {/* Details and Status in one row */}
              <View style={styles.detailsContainer}>
                <View style={styles.row}>
                  <Text style={styles.title}>{item.details}</Text>
                  <Text style={styles.title}>{item.status}</Text>
                </View>
                <View>
                  <Text style={styles.info}>Max Point:{item.maxPoints}</Text>
                  <Text style={styles.info}>Valid until: {item.validUntil}</Text>
                </View>
              </View>

              {/* Edit Button */}
              <TouchableOpacity style={styles.editBtn}>
                <Text>Edit</Text>
                <Entypo name="edit" size={15} color={'#0008'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.PlusIcon}
        onPress={() => navigation.navigate('addbonusform')}>
        <AntDesign name="plus" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default BonusCardScreen;

const styles = StyleSheet.create({
  bonusCard: {
    marginVertical: hp(2),
    padding: 15,
    width: wp(96),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
    borderRadius: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    columnGap: 10,
    width: wp(40),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    backgroundColor: '#FFFF',
    padding: 5,
    width: wp(15),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0009',
  },
  PlusIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#0090FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});
