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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Input from '../components/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
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

  const AddBonusCard = async() => {
    console.log("============functioncall");
    
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const formattedQRCodes = AddQRCodeList.map(qr => ({
        status: qr.status || "=",
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
      )
      const result = await response.json();
      if(response.ok) {
        Alert.alert('Add Bonus Card',"Loyalty card created successfully")
      }
      console.log("RESULT ==========",result);
      
    } catch (error) {
        console.log(error,"=========error");
        
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: wp(5)}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.statusLabel}>Status</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedStatus('enabled')}
            activeOpacity={0.7}>
            <View
              style={[
                styles.radioBtn,
                {
                  borderColor:
                    selectedStatus === 'enabled' ? '#0090FF' : '#999',
                },
              ]}>
              {selectedStatus === 'enabled' && <View style={styles.innerDot} />}
            </View>
            <Text
              style={[
                styles.radioText,
                {color: selectedStatus === 'enabled' ? '#0090FF' : '#999'},
              ]}>
              Enabled
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedStatus('disabled')}
            activeOpacity={0.7}>
            <View
              style={[
                styles.radioBtn,
                {
                  borderColor:
                    selectedStatus === 'disabled' ? '#0090FF' : '#999',
                },
              ]}>
              {selectedStatus === 'disabled' && (
                <View style={styles.innerDot} />
              )}
            </View>
            <Text
              style={[
                styles.radioText,
                {color: selectedStatus === 'disabled' ? '#0090FF' : '#999'},
              ]}>
              Disabled
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: hp(0.4)}}>
          <Input
            onChangeText={text => handleOnchange(text, 'MaxPoint')}
            onFocus={() => handleError(null, 'MaxPoint')}
            label="Max Points"
            value={inputs.MaxPoint}
            placeholder="Max Points"
            error={errors.MaxPoint}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'description')}
            onFocus={() => handleError(null, 'description')}
            label="Description"
            value={inputs.description}
            placeholder="Description"
            error={errors.description}
          />
         <Input
            onFocus={() => setPickerMode('validuntill')}
            label="Valid until"
            value={validUntil ? moment.unix(validUntil).format("DD/MM/YYYY") : ""}
            placeholder="Valid until"
            />
        </View>
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
          <Text
            style={{fontFamily: fonts.PoppinsMedium, fontSize: RFValue(14)}}>
            QR Codes
          </Text>
          <TouchableOpacity
            style={styles.addQRCodeBtn}
            onPress={handleAddQRCode}>
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
                    ? moment.unix(item.expirydate).format("DD/MM/YYYY")
                    : ''
                }
                placeholder="Expiry date"
                />
            </View>
          ))}

        <TouchableOpacity style={styles.bonuscardBtn} 
        onPress={AddBonusCard}
        >
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp(5),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0090FF',
  },
  radioText: {
    fontSize: RFValue(12),
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 8,
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
  cardImage: {
    color: '#000',
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(14),
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
