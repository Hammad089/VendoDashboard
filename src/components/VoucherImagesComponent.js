import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp, wp} from '../constants/scale';
const VoucherImagesComponent = ({
  productImage,
  productImage2,
  ProductImages,
  ProductImages2,
  RedemptionImage,
  RedemptionImag,
  deactivated,
  toggleDeactivated,
  welcomePage,
  togglePage,
  isUnique,
  toggleisUnique,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        {productImage && (
          <Image
            source={{uri: productImage}}
            style={{
              width: 100,
              height: 100,
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
        )}
        <TouchableOpacity
          style={styles.activeImageBtn}
          onPress={() => ProductImages()}>
          <AntDesign name="plus" size={25} color={'#fff'} />
          <Text style={styles.activeImageText}>Active Image</Text>
        </TouchableOpacity>
        {productImage2 && (
          <Image
            source={{uri: productImage2}}
            style={{
              width: 100,
              height: 100,
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        )}
        <TouchableOpacity
          style={styles.inactiveImage}
          onPress={() => ProductImages2()}>
          <AntDesign name="minus" size={25} color={'#fff'} />
          <Text style={styles.activeImageText}>Inactive image</Text>
        </TouchableOpacity>
        {RedemptionImage && (
          <Image
            source={{uri: RedemptionImage}}
            style={{
              width: 100,
              height: 100,
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        )}
        <TouchableOpacity
          style={styles.Redemption}
          onPress={() => RedemptionImag()}>
          <AntDesign name="plus" size={25} color={'#fff'} />
          <Text style={styles.activeImageText}>Redemption Barcode</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10,
          }}>
          <Text>Only one voucher for one user.</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isUnique ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleisUnique}
            value={isUnique}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10,
          }}>
          <Text>Welcome Page.</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={welcomePage ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={togglePage}
            value={welcomePage}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 8,
          }}>
          <Text>Deactivated</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={deactivated ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDeactivated}
            value={deactivated}
          />
        </View>
      </View>
    </View>
  );
};

export default VoucherImagesComponent;

const styles = StyleSheet.create({
  activeImageBtn: {
    flexDirection: 'row',
    columnGap: 10,
    backgroundColor: 'purple',
    width: wp(40),
    height: hp(6),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeImageText: {
    color: '#fff',
    fontSize: 14,
  },
  inactiveImage: {
    marginTop: 10,
    flexDirection: 'row',
    columnGap: 10,
    backgroundColor: 'purple',
    width: wp(40),
    height: hp(6),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Redemption: {
    marginTop: 10,
    flexDirection: 'row',
    columnGap: 10,
    backgroundColor: 'purple',
    width: wp(50),
    height: hp(6),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
