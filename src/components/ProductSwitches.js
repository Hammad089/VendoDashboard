import { StyleSheet, Text, View,Switch } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { wp } from '../constants/scale'

const ProductSwitches = ({setStatus,Status,Deactivate,setDeactivate}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
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
    </View>
  )
}

export default ProductSwitches

const styles = StyleSheet.create({
     stausActive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      },
      label: {
        fontSize: RFValue(14),
        fontWeight: '600',
        color: '#555',
        marginBottom: 6,
        marginLeft: wp(1),
      },
})