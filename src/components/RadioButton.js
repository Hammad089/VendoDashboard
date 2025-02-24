import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {wp} from '../constants/scale';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../constants/fonts';

const RadioButton = ({setSelectedStatus, selectedStatus}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setSelectedStatus('enabled')}
          activeOpacity={0.7}>
          <View
            style={[
              styles.radioBtn,
              {
                borderColor: selectedStatus === 'enabled' ? '#0090FF' : '#999',
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
                borderColor: selectedStatus === 'disabled' ? '#0090FF' : '#999',
              },
            ]}>
            {selectedStatus === 'disabled' && <View style={styles.innerDot} />}
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
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
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
});
