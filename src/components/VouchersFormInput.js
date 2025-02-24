import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from './Input';

const VouchersFormInput = ({handleOnchange, handleError, inputs,errors}) => {
  return (
    <View>
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
    </View>
  );
};

export default VouchersFormInput;

const styles = StyleSheet.create({});
