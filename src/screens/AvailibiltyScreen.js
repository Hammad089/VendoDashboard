import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Switch,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../constants/fonts';
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const AvailabilityScreen = () => {
  const [availability, setAvailability] = useState(
    weekdays.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {active: false, startTime: null, endTime: null},
      }),
      {},
    ),
  );

  const [pickerMode, setPickerMode] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleConfirm = date => {
    if (selectedDay && pickerMode) {
      setAvailability(prevState => ({
        ...prevState,
        [selectedDay]: {
          ...prevState[selectedDay],
          [pickerMode]: date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      }));
    }
    setPickerMode(null);
    setSelectedDay(null);
  };

  const toggleDay = day => {
    setAvailability(prevState => ({
      ...prevState,
      [day]: {...prevState[day], active: !prevState[day].active},
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weekdays.map(day => (
          <View key={day} style={styles.dayContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>{day}</Text>
              <Switch
                value={availability[day].active}
                onValueChange={() => toggleDay(day)}
              />
            </View>
            {availability[day].active && (
              <View style={styles.timeContainer}>
                <TouchableOpacity
                  style={styles.timeInputContainer}
                  onPress={() => {
                    setSelectedDay(day);
                    setPickerMode('startTime');
                  }}>
                  <View style={styles.input}>
                    <Text
                      style={{fontFamily: fonts.PoppinsMedium, fontSize: 12}}>
                      {availability[day].startTime
                        ? availability[day].startTime
                        : 'Start Time'}
                    </Text>
                  </View>

                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#007BFF"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timeInputContainer}
                  onPress={() => {
                    setSelectedDay(day);
                    setPickerMode('endTime');
                  }}>
                  <View style={styles.input} editable={false}>
                    <Text
                      style={{fontFamily: fonts.PoppinsMedium, fontSize: 12}}>
                      {availability[day].endTime
                        ? availability[day].endTime
                        : 'End Time'}
                    </Text>
                  </View>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#0090FF"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        <DateTimePickerModal
          isVisible={!!pickerMode}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={() => {
            setPickerMode(null);
            setSelectedDay(null);
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dayContainer: {
    marginBottom: 15,
    backgroundColor: '#FFF',
    padding: 10,

    borderWidth: 1,
    borderColor: '#0008',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 0,
    width: '40%',
    borderWidth: 1,
    borderColor: '#0006',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 5,
  },
});

export default AvailabilityScreen;
