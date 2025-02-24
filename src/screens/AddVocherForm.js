import mime from 'mime';
import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import VoucherImagesComponent from '../components/VoucherImagesComponent';
import VouchersFormInput from '../components/VouchersFormInput';
import { fonts } from '../constants/fonts';
import { hp, wp } from '../constants/scale';
const AddVocherForm = () => {
  const [inputs, setInputs] = useState({
    title: '',
    providername: '',
    LongDescription: '',
    ShortDescription: '',
    quantity: '',
  });
  const [startDate, setStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [pickerMode, setPickerMode] = useState(null);
  const [isUnique, setisUnique] = useState(false);
  const [welcomePage, setWelcomePage] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [errors, setErrors] = useState({});
  const [productImage, setProductImage] = useState(null);
  const [productImage2, setProductImage2] = useState(null);
  const [RedemptionImage, setRedemptionImage] = useState(null);
  const toggleisUnique = () => setisUnique(previousState => !previousState);
  const togglePage = () => setWelcomePage(previousState => !previousState);
  const toggleDeactivated = () =>
    setDeactivated(previousState => !previousState);

  const FetchVochers = async () => {
    try {
      const fileExtension1 = productImage
        ? productImage.split('.').pop().toLowerCase()
        : null;
      const fileExtension2 = productImage
        ? productImage.split('.').pop().toLowerCase()
        : null;
      const fileExtension3 = RedemptionImage
        ? RedemptionImage.split('.').pop().toLowerCase()
        : null;

      let mimeType1 = fileExtension1 ? mime.getType(fileExtension1) : null;
      let mimeType2 = fileExtension2 ? mime.getType(fileExtension2) : null;
      let mimeType3 = fileExtension3 ? mime.getType(fileExtension3) : null;

      if (!mimeType1 || !mimeType2 || !mimeType3) {
        throw new Error('Unsupported file type');
      }

      const formdata = new FormData();
      formdata.append('pid', '632f5f00f2bf252f6606b10d');
      formdata.append('providerName', inputs.providername);
      formdata.append('title', inputs.title);
      formdata.append('quantity', inputs.quantity);
      formdata.append('startDate', startDate);
      formdata.append('endDate', endDate);
      formdata.append('shortDescription', inputs.ShortDescription);
      formdata.append('longDescription', inputs.LongDescription);
      formdata.append('deactivate', deactivated);
      formdata.append('isUnique', isUnique);
      formdata.append('iswelcome', welcomePage);

      /// append image
      if (productImage) {
        formdata.append('activeImage', {
          uri: productImage,
          type: mimeType1,
          name: `activeImage.${fileExtension1}`,
        });
      }
      if (productImage2) {
        formdata.append('inactiveImage', {
          uri: productImage2,
          type: mimeType2,
          name: `inactiveImage.${fileExtension2}`,
        });
      }
      if (RedemptionImage) {
        formdata.append('redemptionBarcode', {
          uri: RedemptionImage,
          type: mimeType2,
          name: `redemptionBarcode.${fileExtension2}`,
        });
      }

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3001/vouchers_mobile/add_voucher',
        requestOptions,
      );
      const result = await response.json();
      console.log('RESPONSE add vochers', result);
      if (response.ok) {
        Alert.alert('Success', 'Product updated successfully!');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleConfirm = date => {
    const formatedDate = date.toISOString().split('T')[0];
    if (pickerMode === 'startDate') {
      setStartDate(formatedDate);
    } else if (pickerMode === 'endDate') {
      setEndDate(formatedDate);
    }
    setPickerMode(null);
  };
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.title) {
      handleError('Please Enter title', 'title');
      isValid = false;
    }
    if (!inputs.quantity) {
      handleError('Please input max quantity', 'quantity');
      isValid = false;
    }

    if (!inputs.LongDescription) {
      handleError('Please input long description', 'longdescription');
      isValid = false;
    }
    if (!inputs.ShortDescription) {
      handleError('Please input short description', 'Shortdescription');
      isValid = false;
    }

    if (isValid) {
      FetchVochers();
      setLoading(false);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const ProductImage = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProductImage(response.assets[0].uri);
      }
    });
  };

  const ProductImage2 = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProductImage2(response.assets[0].uri);
      }
    });
  };
  const RedemptionImag = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setRedemptionImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VouchersFormInput
          errors={errors}
          inputs={inputs}
          handleError={handleError}
          handleOnchange={handleOnchange}
        />
        <VoucherImagesComponent
          productImage={productImage}
          productImage2={productImage2}
          ProductImages={ProductImage}
          ProductImages2={ProductImage2}
          RedemptionImage={RedemptionImage}
          RedemptionImag={RedemptionImag}
          deactivated={deactivated}
          toggleDeactivated={toggleDeactivated}
          welcomePage={welcomePage}
          togglePage={togglePage}
          isUnique={isUnique}
          toggleisUnique={toggleisUnique}
        />
        <TouchableOpacity
          style={styles.addProductBtn}
          onPress={validate}
          disabled={loading}>
          <Text style={styles.addProductBtnText}>Add Product</Text>
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

export default AddVocherForm;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: '#F3F4FB',
  },
  addProductBtn: {
    marginTop: 10,
    backgroundColor: '#04AA6D',
    width: wp(90),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
  },
  addProductBtnText: {
    fontSize: RFValue(14),
    color: '#fff',
    fontFamily: fonts.PoppinsMedium,
  },
});
