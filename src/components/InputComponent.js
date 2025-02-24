import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from './Input'
import moment from 'moment';
import { hp } from '../constants/scale';
const InputComponent = ({inputs,setPickerMode,handleError,handleOnchange,errors,validUntil}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
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
    </View>
  )
}

export default InputComponent

const styles = StyleSheet.create({})