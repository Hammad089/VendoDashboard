import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from './Input'

const AddProductInput = ({handleOnchange,handleError,inputs,errors}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
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
    </View>
  )
}

export default AddProductInput

const styles = StyleSheet.create({})