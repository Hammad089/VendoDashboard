import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Input from '../components/Input';
import {fonts} from '../constants/fonts';
import {hp, wp} from '../constants/scale';
import mime from 'mime';
const EditVocherForm = ({route}) => {
  const {item} = route.params;
  console.log(item, '================item');

  const [inputs, setInputs] = useState({
    title: item?.title || '',
    providername: item?.providername || '',
    LongDescription: item?.longDescription || '',
    ShortDescription: item?.shortDescription || '',
    quantity: item?.quantity.toString() || '',
  });
  const [startDate, setStartDate] = useState(item.startDate);
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(item.endDate);
  const [pickerMode, setPickerMode] = useState(null);
  const [isUnique, setisUnique] = useState(false);
  const [welcomePage, setWelcomePage] = useState(item.iswelcome);
  const [deactivated, setDeactivated] = useState(item.deactivate);
  const [errors, setErrors] = useState({});
  const [productImage, setProductImage] = useState(null);
  const [productImage2, setProductImage2] = useState(null);
  const [RedemptionImage, setRedemptionImage] = useState(null);
  const toggleisUnique = () => setisUnique(previousState => !previousState);
  const togglePage = () => setWelcomePage(previousState => !previousState);
  const toggleDeactivated = () =>
    setDeactivated(previousState => !previousState);

  const UpdateVouchers = async () => {
    try {
      const formdata = new FormData();
      formdata.append('id', item.id);
      formdata.append('providerName', inputs.providername);
      formdata.append('title', inputs.title);
      formdata.append('quantity', inputs.quantity);
      formdata.append('startDate', startDate);
      formdata.append('endDate', endDate);
      formdata.append('shortDescription', inputs.ShortDescription);
      formdata.append('longDescription', inputs.LongDescription);
      //   formdata.append('activeImage', fileInput.files[0], 'image-2.png');
      //   formdata.append('inactiveImage', fileInput.files[0], 'image.png');
      //   formdata.append('redemptionBarcode', fileInput.files[0], 'images.png');
      formdata.append('deactivate', deactivated);
      formdata.append('isUnique', isUnique);
      formdata.append('iswelcome', welcomePage);

      if (productImage) {
        formdata.append('productImage', {
          uri: productImage,
          type: mime.getType(productImage),
          name: productImage.split('/').pop(),
        });
      } else {
        formdata.append('productImage', item.productImage);
      }

      if (productImage2) {
        formdata.append('productImage2', {
          uri: productImage2,
          type: mime.getType(productImage2),
          name: productImage2.split('/').pop(),
        });
      } else {
        formdata.append('productImage2', item.productImage2);
      }
      if (RedemptionImage) {
        formdata.append('RedemptionImage', {
          uri: RedemptionImage,
          type: mime.getType(RedemptionImage),
          name: RedemptionImage.split('/').pop(),
        });
      } else {
        formdata.append('productImage2', item.RedemptionImage);
      }

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3001/vouchers_mobile/update_voucher',
        requestOptions,
      );
      const result = await response.json();
      console.log('==============update product', result);
    
      if (response.ok) {
        Alert.alert('Success', 'Product updated successfully!');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
     
    } catch (error) {
      console.log(error, '========error');
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
      UpdateVouchers();
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
        <Input
          onChangeText={text => handleOnchange(text, 'providername')}
          onFocus={() => handleError(null, 'providername')}
          label="Provider Name"
          value={inputs.providername}
          placeholder="Provider Name"
          error={errors.providername}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'title')}
          onFocus={() => handleError(null, 'title')}
          label="Title"
          value={inputs.title}
          placeholder="Enter title"
          error={errors.title}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'quantity')}
          onFocus={() => handleError(null, 'quantity')}
          label="Quantity"
          value={inputs.quantity}
          placeholder="Enter quantity"
          error={errors.quantity}
        />
        <Input
          onFocus={() => setPickerMode('startDate')}
          label="Start Date"
          value={startDate}
          placeholder="Select Start Date"
        />
        <Input
          onFocus={() => setPickerMode('endDate')}
          label="End Date"
          value={endDate}
          placeholder="Select End Date"
        />
        <Input
          onChangeText={text => handleOnchange(text, 'LongDescription')}
          onFocus={() => handleError(null, 'LongDescription')}
          label="Long Description"
          value={inputs.LongDescription}
          placeholder="Enter Long Description"
          error={errors.LongDescription}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'ShortDescription')}
          onFocus={() => handleError(null, 'ShortDescription')}
          label="Short Description"
          value={inputs.ShortDescription}
          placeholder="Enter ShortDescription"
          error={errors.ShortDescription}
        />
        <View>
          {item.activeImage && (
            <Image
            source={{ uri: item.activeImage
                ? `https://www.mein-vendoapp.de:3001${
                    item.activeImage.startsWith('/')
                      ? item.activeImage
                      : '/' + item.activeImage
                  }`
                : 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg',}}
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
            onPress={() => ProductImage()}>
            <AntDesign name="plus" size={25} color={'#fff'} />
            <Text style={styles.activeImageText}>Active Image</Text>
          </TouchableOpacity>
          {item.inactiveImage && (
            <Image
            source={{ uri: item.inactiveImage
                ? `https://www.mein-vendoapp.de:3001${
                    item.inactiveImage.startsWith('/')
                      ? item.inactiveImage
                      : '/' + item.inactiveImage
                  }`
                : 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg',}}
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
            onPress={() => ProductImage2()}>
            <AntDesign name="minus" size={25} color={'#fff'} />
            <Text style={styles.activeImageText}>Inactive image</Text>
          </TouchableOpacity>
          {item.redemptionBarcode && (
            <Image
            source={{ uri: item.redemptionBarcode
                ? `https://www.mein-vendoapp.de:3001${
                    item.redemptionBarcode.startsWith('/')
                      ? item.redemptionBarcode
                      : '/' + item.redemptionBarcode
                  }`
                : 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg',}}
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

export default EditVocherForm;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: '#F3F4FB',
  },
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
