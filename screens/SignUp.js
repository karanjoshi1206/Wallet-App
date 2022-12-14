import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const SignUp = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        let areaData = data.map(item => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `${item.callingCodes[0]}`,
            // flag: `https://countryflags.io/${item.alpha2Code}/flat/:64.png`,
            flag: item?.flags?.png,
          };
        });

        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter(a => a.code == 'IN');
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
    setIsLoading(false);
  }, []);

  // console.log('selected area is ', selectedArea.flag);

  function renderHeader() {
    return (
      <TouchableOpacity
        onPress={() => console.log('Pressed')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 4,
          paddingHorizontal: SIZES.padding * 2,
        }}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.white,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.wallieLogo}
          resizeMode="contain"
          style={{
            width: '60%',
          }}
        />
      </View>
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        {/* Full name */}

        <View
          style={{
            marginTop: SIZES.padding * 3,
          }}>
          <Text
            style={{
              color: COLORS.lightGreen,
              ...FONTS.body3,
            }}>
            Full Name
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>

        {/* PhoneNumber */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text
            style={{
              color: COLORS.lightGreen,
              ...FONTS.body3,
            }}>
            Phone Number
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* Country CODE */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                ...FONTS.body2,
                flexDirection: 'row',
              }}
              onPress={() => setModalVisible(true)}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={icons.down}
                  resizeMode="contain"
                  style={{
                    height: 10,
                    width: 10,
                    tintColor: 'white',
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 5,
                }}>
                <Image
                  source={{uri: selectedArea?.flag}}
                  resizeMode="contain"
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body3,
                  }}>
                  + {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Phone Number */}
            <TextInput
              style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Password */}
        <View
          style={{
            marginTop: SIZES.padding * 2,
          }}>
          <Text
            style={{
              color: COLORS.lightGreen,
              ...FONTS.body3,
            }}>
            Password
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={showPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowPassword(prev => !prev)}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 10,
            height: 30,
            width: 30,
          }}>
          <Image
            source={showPassword ? icons.disable_eye : icons.eye}
            style={{
              height: 20,
              width: 20,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{margin: SIZES.padding * 2}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius * 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAreaCodeModal() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}>
          <Image
            source={{uri: item.flag}}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: 'black',
              ...FONTS.body4,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGreen,
              }}>
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={item => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]}>
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          <ScrollView style={styles.linearGradient}>
            {renderHeader()}
            {renderLogo()}
            {renderForm()}
            {renderButton()}
          </ScrollView>
        )}
      </LinearGradient>
      {renderAreaCodeModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  linearGradient: {
    minHeight: '100%',
  },
});
