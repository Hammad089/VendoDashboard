import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { hp, wp } from '../constants/scale'
import { RFValue } from 'react-native-responsive-fontsize'

const ProductsImagesComponent = ({ImageUrl,handlePickPhoto,handlePickPhoto1,ImageUrl1}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
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
    </View>
  )
}

export default ProductsImagesComponent

const styles = StyleSheet.create({
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
})