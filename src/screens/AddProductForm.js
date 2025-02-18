import {useNavigation} from '@react-navigation/native';
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
import {RFValue} from 'react-native-responsive-fontsize';
import BottonSheet from '../components/BottomSheet';
import Input from '../components/Input';
import {fonts} from '../constants/fonts';
import {hp, wp} from '../constants/scale';
import mime from 'mime';
const AddProductForm = () => {
  const [inputs, setInputs] = useState({
    ProductName: '',
    MaxQuantity: '',
    Category: '',
    Size: '',
    Price: '',
    Stock: '',
    Shortdescription: '',
    longdescription: '',
    Ingredients: '',
  });
  const [errors, setErrors] = useState({});
  const [isVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Status, setStatus] = useState(false);
  const [Deactivate, setDeactivate] = useState(false);
  const [ImageUrl, setImageUrl] = useState(null);
  const [ImageUrl1, setImageUrl1] = useState(null);

  const AddProduct = async () => {
    try {
      const fileExtension1 = ImageUrl
        ? ImageUrl.split('.').pop().toLowerCase()
        : null;
      const fileExtension2 = ImageUrl1
        ? ImageUrl1.split('.').pop().toLowerCase()
        : null;

      let mimeType1 = fileExtension1 ? mime.getType(fileExtension1) : null;
      let mimeType2 = fileExtension2 ? mime.getType(fileExtension2) : null;

      if (!mimeType1 || !mimeType2) {
        throw new Error('Unsupported file type');
      }

      const formdata = new FormData();
      formdata.append('maxQuantity', inputs.MaxQuantity);
      formdata.append('name', inputs.ProductName);
      formdata.append('inStock', inputs.Stock);
      formdata.append('pid', '632f5f00f2bf252f6606b10d');
      formdata.append('category', inputs.Category);
      formdata.append('size', inputs.Size);
      formdata.append('ingredients', inputs.Ingredients);
      formdata.append('price', inputs.Price);
      formdata.append('shortDescription', inputs.Shortdescription);
      formdata.append('longDescription ', inputs.longdescription);
      formdata.append('status', Status);
      formdata.append('deactivate', Deactivate);

      if (ImageUrl) {
        formdata.append('productImage', {
          uri: ImageUrl,
          type: mimeType1,
          name: `productImage.${fileExtension1}`,
        });
      }
      if (ImageUrl1) {
        formdata.append('productImage2', {
          uri: ImageUrl1,
          type: mimeType2,
          name: `productImage2.${fileExtension2}`,
        });
      }

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://www.mein-vendoapp.de:3001/products/add_product',
        requestOptions,
      );
      const result = await response.json();
      console.log(result, '====================result');
      if (response.ok) {
        Alert.alert('Success', 'Product updated successfully!');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.ProductName) {
      handleError('Please Enter Product', 'ProductName');
      isValid = false;
    }
    if (!inputs.MaxQuantity) {
      handleError('Please input max quality', 'MaxQuantity');
      isValid = false;
    }
    if (!inputs.Category) {
      handleError('Please input category', 'Category');
      isValid = false;
    }

    if (!inputs.Size) {
      handleError('Please input size', 'Size');
      isValid = false;
    }

    if (!inputs.Price) {
      handleError('Please input price', 'Price');
      isValid = false;
    }
    if (!inputs.Stock) {
      handleError('Please input stock', 'Stock');
      isValid = false;
    }
    if (!inputs.longdescription) {
      handleError('Please input long description', 'longdescription');
      isValid = false;
    }
    if (!inputs.Shortdescription) {
      handleError('Please input short description', 'Shortdescription');
      isValid = false;
    }
    if (!inputs.Ingredients) {
      handleError('Please input ingredients', 'Ingredients');
      isValid = false;
    }

    if (isValid) {
      AddProduct();
      setInputs({
        ProductName: '',
        MaxQuantity: '',
        Category: '',
        Size: '',
        Price: '',
        Stock: '',
        Shortdescription: '',
        longdescription: '',
        Ingredients: '',
      })
      setLoading(false);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handlePickPhoto = async () => {
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
        setImageUrl(response.assets[0].uri);
      }
    });
  };

  const handlePickPhoto1 = async () => {
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
        setImageUrl1(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          onChangeText={text => handleOnchange(text, 'ProductName')}
          onFocus={() => handleError(null, 'ProductName')}
          value={inputs.ProductName}
          label="Product Name"
          placeholder="Enter product name"
          error={errors.ProductName}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'MaxQuantity')}
          onFocus={() => handleError(null, 'MaxQuantity')}
          value={inputs.MaxQuantity}
          label="Max Quantity"
          placeholder="Enter Quantity"
          error={errors.MaxQuantity}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'Category')}
          onFocus={() => setModalVisible(true)}
          value={inputs.Category}
          label="Category"
          placeholder="Enter Category"
          error={errors.Category}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'Size')}
          onFocus={() => handleError(null, 'Size')}
          value={inputs.Size}
          label="Size"
          placeholder="Size"
          error={errors.Size}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'Ingredients')}
          onFocus={() => handleError(null, 'Ingredients')}
          value={inputs.Ingredients}
          label="Ingredients"
          placeholder="ingredients"
          error={errors.Ingredients}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'Price')}
          onFocus={() => handleError(null, 'Price')}
          value={inputs.Price}
          label="Price"
          placeholder="Price"
          error={errors.Price}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'Stock')}
          onFocus={() => handleError(null, 'Stock')}
          value={inputs.Stock}
          label="Stock"
          placeholder="Stock"
          error={errors.Stock}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'Shortdescription')}
          onFocus={() => handleError(null, 'Shortdescription')}
          value={inputs.Shortdescription}
          label="Short description"
          placeholder="Short description"
          error={errors.Shortdescription}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'longdescription')}
          onFocus={() => handleError(null, 'longdescription')}
          value={inputs.longdescription}
          label="Long description"
          placeholder="Long description"
          error={errors.longdescription}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product image 1</Text>
          {ImageUrl && (
            <Image
              source={{uri: ImageUrl}}
              style={{
                width: 100,
                height: 100,
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
          )}
          <TouchableOpacity
            style={styles.productImage}
            onPress={() => handlePickPhoto()}>
            <Text style={styles.productImageText}>Product Image 1</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product image 2</Text>
          {ImageUrl1 && (
            <Image
              source={{uri: ImageUrl1}}
              style={{
                width: 100,
                height: 100,
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
          )}
          <TouchableOpacity
            style={styles.productImage}
            onPress={() => handlePickPhoto1()}>
            <Text style={styles.productImageText}>Product Image 2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.stausActive}>
          <Text style={styles.label}>Status</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={Status ? 'green' : 'red'}
            ios_backgroundColor="#767577"
            onValueChange={setStatus}
            value={Status}
            style={{height: 30}}
          />
        </View>
        <View style={styles.stausActive}>
          <Text style={styles.label}>Deactivate</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={Deactivate ? 'green' : 'red'}
            ios_backgroundColor="#767577"
            onValueChange={setDeactivate}
            value={Deactivate}
            style={{height: 30}}
          />
        </View>
        <TouchableOpacity
          style={styles.addProductBtn}
          onPress={validate}
          disabled={loading}>
          <Text style={styles.addProductBtnText}>Add Product</Text>
        </TouchableOpacity>
        <BottonSheet
          isVisible={isVisible}
          setModalVisible={() => setModalVisible(false)}
          selectedCat={inputs.Category}
          onSelectCategory={category => handleOnchange(category, 'Category')}
        />
      </ScrollView>
    </View>
  );
};

export default AddProductForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(4),
  },
  headerText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: hp(2),
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginLeft: wp(1),
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: RFValue(14),
    height: hp(7),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    height: hp(7),
  },
  placeholder: {
    fontSize: RFValue(14),
    color: '#888',
  },
  selectedText: {
    fontSize: RFValue(14),
    color: '#333',
  },
  searchInput: {
    height: 40,
    fontSize: RFValue(14),
  },
  inputTextArea: {
    height: 200,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: RFValue(14),
    justifyContent: 'flex-start',
  },
  productImage: {
    backgroundColor: 'lightblue',
    width: wp(40),
    height: hp(6),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    fontSize: RFValue(14),
    color: '#fff',
    fontWeight: '500',
  },
  stausActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
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
  error: {
    color: 'red',
    fontSize: RFValue(12),
    marginTop: 4,
  },
  inputTextArea: {
    height: 200,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: RFValue(14),
    justifyContent: 'flex-start',
  },
});
