import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp,wp} from '../constants/scale';
import Input from './Input';
import moment from 'moment';
const AddQRcodeComponent = ({
  setPickerMode,
  AddQRCodeList,
  setAddQRcodeList,
  handleAddQRCode,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.cardImage}>Card Image</Text>
      <TouchableOpacity style={styles.choosefileBtn}>
        <Text style={styles.choosefileText}>CHOOSE FILE</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontFamily: fonts.PoppinsMedium, fontSize: RFValue(14)}}>
          QR Codes
        </Text>
        <TouchableOpacity style={styles.addQRCodeBtn} onPress={handleAddQRCode}>
          <AntDesign name="plus" size={20} color={'#0099ef'} />
          <Text
            style={{
              fontFamily: fonts.PoppinsMedium,
              fontSize: RFValue(12),
              color: '#0007',
            }}>
            ADD QCODE
          </Text>
        </TouchableOpacity>
      </View>
      {AddQRCodeList.length > 0 &&
        AddQRCodeList.map((item, index) => (
          <View key={index} style={styles.qrCodeContainer}>
            <Text style={styles.qrCodeTitle}>QR Code {index + 1}</Text>
            <Input
              label="Status"
              placeholder="Status (Active/Disabled)"
              value={item.status}
              onChangeText={text => {
                let newList = [...AddQRCodeList];
                newList[index].status = text;
                setAddQRcodeList(newList);
              }}
            />
            <Input
              label="Qrcode Point"
              placeholder="Qrcode Point"
              value={item.qrcodepoint}
              keyboardType="numeric"
              onChangeText={text => {
                let newList = [...AddQRCodeList];
                newList[index].qrcodepoint = text;
                setAddQRcodeList(newList);
              }}
            />
            <Input
              onFocus={() => setPickerMode(`expiry-${index}`)}
              label="Expiry date"
              value={
                item.expirydate
                  ? moment.unix(item.expirydate).format('DD/MM/YYYY')
                  : ''
              }
              placeholder="Expiry date"
            />
          </View>
        ))}
    </View>
  );
};

export default AddQRcodeComponent;

const styles = StyleSheet.create({
  cardImage: {
    color: '#000',
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(14),
  },
  choosefileBtn: {
    marginTop: 10,
    borderRadius: 8,
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    padding: 6,
    borderColor: '#0099ef',
  },
  choosefileText: {
    color: '#0099ef',
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(12),
  },
  addQRCodeBtn: {
    flexDirection: 'row',
    columnGap: 5,
    borderRadius: 8,
    width: wp(33),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    padding: 10,
    borderColor: '#0099ef',
  },
  qrCodeContainer: {
    marginVertical: hp(1),
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  qrCodeTitle: {
    color: '#000',
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(14),
  },
});
