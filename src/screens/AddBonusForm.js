import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../constants/scale';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Input from '../components/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioButton from '../components/RadioButton';
import InputComponent from '../components/InputComponent';
import AddQRcodeComponent from '../components/AddQRcodeComponent';
const AddBonusForm = () => {
  const [selectedStatus, setSelectedStatus] = useState('enabled');
  const [inputs, setInputs] = useState({
    MaxPoint: '',
    description: '',
  });
  const [AddQRCodeList, setAddQRcodeList] = useState([]);
  const [errors, setErrors] = useState({});
  const [validUntil, setValidUntil] = useState(null);
  const [pickerMode, setPickerMode] = useState(null);
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const handleConfirm = date => {
    const formattedDate = Math.floor(date.getTime() / 1000);

    if (pickerMode.startsWith('expiry-')) {
      const index = parseInt(pickerMode.split('-')[1], 10);
      let newList = [...AddQRCodeList];
      newList[index].expirydate = formattedDate;
      setAddQRcodeList(newList);
    } else if (pickerMode === 'validuntill') {
      setValidUntil(formattedDate);
    }

    setPickerMode(null);
  };
  const handleAddQRCode = () => {
    setAddQRcodeList(prevList => [
      ...prevList,
      {status: '', qrcodepoint: '', expirydate: ''},
    ]);
  };

  const AddBonusCard = async () => {
    console.log('============functioncall');

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const formattedQRCodes = AddQRCodeList.map(qr => ({
        status: qr.status || '=',
        points: parseInt(qr.qrcodepoint) || 40,
        expiryDate: qr.expirydate ? parseInt(qr.expirydate) : null,
      }));

      const raw = JSON.stringify({
        vendorId: '632f5f00f2bf252f6606b10d',
        maxPoints: inputs.MaxPoint,
        status: selectedStatus,
        qrCodes: formattedQRCodes,
        validUntil: validUntil || null,
        details: inputs.description,
        image:
          'https://vendo-images-bucket.s3.eu-north-1.amazonaws.com/BonusCard_Kaffe-2f0f63c1-8243-4667-b3ae-6e99cf5430dd.jpg',
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3103/bc_mb-admin/add_card',
        requestOptions,
      );
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Add Bonus Card', 'Loyalty card created successfully');
      }
      console.log('RESULT ==========', result);
      setInputs({
        MaxPoint: '',
       description: '',
      })
      setAddQRcodeList('');
      
    } catch (error) {
      console.log(error, '=========error');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: wp(5)}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.statusLabel}>Status</Text>
        <RadioButton
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        <InputComponent
          inputs={inputs}
          setPickerMode={setPickerMode}
          handleError={handleError}
          handleOnchange={handleOnchange}
          errors={errors}
          validUntil={validUntil}
        />
        <AddQRcodeComponent
          setPickerMode={setPickerMode}
          AddQRCodeList={AddQRCodeList}
          setAddQRcodeList={setAddQRcodeList}
          handleAddQRCode={handleAddQRCode}
        />
        <TouchableOpacity style={styles.bonuscardBtn} onPress={AddBonusCard}>
          <Text
            style={{
              fontFamily: fonts.PoppinsMedium,
              fontSize: RFValue(14),
              color: '#fff',
            }}>
            Add Bonus Card
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={!!pickerMode}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => {
            setPickerMode(null);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AddBonusForm;

const styles = StyleSheet.create({
  statusLabel: {
    fontFamily: fonts.PoppinsMedium,
    color: '#0009',
    fontSize: RFValue(16),
    marginBottom: hp(2),
  },

  input: {
    height: hp(5),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  bonuscardBtn: {
    marginVertical: hp(2),
    height: hp(5),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ff',
    padding: 10,
    borderRadius: 50,
  },
});
