import Modal from 'react-native-modal';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import {wp} from '../constants/scale';
import {fonts} from '../constants/fonts';
const categories = ['Cat 1', 'Cat 2', 'Cat 3'];
function BottonSheet({selectedCat = 'Cat 1', isVisible, setModalVisible,onSelectCategory}) {
  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      animationOutTiming={500}
      animationInTiming={500}
      isVisible={isVisible}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View
        style={{
          paddingBottom: 30,
          backgroundColor: '#fff',
          padding: 20,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        {categories.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onSelectCategory(item)
                setModalVisible(false)
              }}
              style={{
                flexDirection: 'row',
                width: wp(90),
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                height: 55,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: '#0004',
              }}
              key={`${index}`}>
              <Text style={{fontFamily: fonts.PoppinsSemiBold}}>{item}</Text>
              <View
                style={{
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                }}>
                {selectedCat == item && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                      backgroundColor: '#0090FF',
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
}

export default BottonSheet;
