import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {wp} from '../constants/scale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const ContentManagementForm = () => {
  const [inputs, setInput] = useState({
    subjectline: '',
    description: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState('');
  const [WelcomenStartDate, setWelcomeStartDate] = useState({});
  const [WelcomenEndDate, setWelcomenEndDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickerMode, setPickerMode] = useState(null);
  const handleOnchange = (text, input) => {
    setInput(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const handleConfirm = date => {
    const formatedDate = date.toISOString().split('T')[0];
    if (pickerMode === 'startDate') {
      setStartDate(formatedDate);
    } else if (pickerMode === 'endDate') {
      setEndDate(formatedDate);
    } else if (pickerMode === 'WelcomenStartDate') {
      setWelcomeStartDate(formatedDate);
    } else if (pickerMode === 'WelcomenEndDate') {
      setWelcomenEndDate(formatedDate);
    }
    setPickerMode(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: fonts.PoppinsBold,
            fontSize: RFValue(16),
            marginBottom: 10,
          }}>
          Company Presentation
        </Text>
        <Input
          onChangeText={text => handleOnchange(text, 'subjectline')}
          onFocus={() => handleError(null, 'subjectline')}
          value={inputs.subjectline}
          label={'Subject Line'}
          placeholder="Subject Line"
          error={errors.subjectline}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'description')}
          onFocus={() => handleError(null, 'description')}
          value={inputs.description}
          label={'Description'}
          placeholder="Description"
          error={errors.description}
        />
        <Text style={styles.mediaText}>Media Files</Text>

        <View style={styles.mediaContainer}>
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <FontAwesome name="cloud-upload" size={28} color={'#0099ef'} />
            <Text style={styles.label}>Main Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <FontAwesome name="cloud-upload" size={28} color={'#0099ef'} />
            <Text style={styles.label}>Additional Photo 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <FontAwesome name="cloud-upload" size={28} color={'#0099ef'} />
            <Text style={styles.label}>Additional Photo 2</Text>
          </TouchableOpacity>
        </View>
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
          onFocus={() => setPickerMode('WelcomenStartDate')}
          label="Welcomen StartDate"
          value={WelcomenStartDate}
          placeholder="Select Start Date"
        />
        <Input
          onFocus={() => setPickerMode('WelcomenEndDate')}
          label="Welcomen EndDate"
          value={WelcomenEndDate}
          placeholder="Select End Date"
        />
        <View
          style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
          <Text>Show in Feed</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createText}>Create</Text>
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

export default ContentManagementForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  mediaText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(14),
    color: '#000',
    marginBottom: 12,
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
    marginTop: 10,
  },
  uploadBtn: {
    width: wp(30),
    height: wp(18),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0008',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: RFValue(9),
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
  },
  createBtn: {
    padding: 18,
    marginTop: 10,
    backgroundColor: '#0099ef',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 50,
  },
  createText: {
    fontFamily: fonts.PoppinsMedium,
    color: '#fff',
    fontSize: RFValue(14),
  },
});
