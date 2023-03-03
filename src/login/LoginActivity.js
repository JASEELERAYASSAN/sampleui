import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import PhoneInput from 'react-native-phone-number-input'
import auth from '@react-native-firebase/auth'
import Toast from 'react-native-simple-toast'

const LoginActivity = ({ navigation, route }) => {

    const [image, setImage] = useState(route.params.image)
    const [country, setCountry] = useState(['+91'])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const phoneInput = useRef(null)

    async function signInWithPhoneNumber(number) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(number);
            if (confirmation.state != "error") {
                setIsLoading(false);
                navigation.navigate('LoginOtp', { confirm: confirmation, image });
                console.log("confirmation", confirmation);
            }
        } catch (error) {
            if (error.code == 'auth/too-many-requests') {
                Toast.show('Too-many-requests', Toast.SHORT);
                console.log('auth/too-many-requests', error);
            } else if (error.code === 'auth/user-disabled') {
                Toast.show('Sorry, this phone number has been blocked.', Toast.SHORT)
                console.log('auth/user-disabled', error);
            } else {
                Toast.show('Sorry, we couldn\'t verify that phone number at the moment.', Toast.SHORT);
                console.log(error);
            }
        }
    }

    const onNext = () => {
        setIsLoading(true);
        signInWithPhoneNumber('+' + country + phoneNumber);
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollView}>
                <Text style={styles.welcome}>Welcome!</Text>
                <Text style={styles.number}>Mobile Number</Text>
                <View style={styles.phoneInputView}>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode='IN'
                        placeHolder='Enter Phone Number'
                        containerStyle={styles.phoneNumberView}
                        codeTextStyle={{ fontSize: hp('1.75%'), fontWeight: '500', paddingBottom: hp('0.2%') }}
                        textInputStyle={{ fontSize: hp('1.75%'), fontWeight: '400' }}
                        countryPickerProps={{ withAlphaFilter: true }}
                        onChangeText={text => {
                            setPhoneNumber(text)
                        }}
                        onChangeCountry={text => {
                            setCountry(text.callingCode.join(','))
                        }}
                        textContainerStyle={{ paddingVertical: 5 }}
                    />
                </View>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    onPress={() => onNext()}
                    style={styles.buttonText}>
                    <Text style={styles.otpText} >GET OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginActivity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: hp('5%'),
        color: '#000',
        marginLeft: hp('22%')
    },
    scrollView: {
        // backgroundColor: '#000',
    },
    number: {
        marginTop: hp('5%'),
        marginLeft: 30,
        fontSize: 15,
        color: '#000',
        fontWeight: '400',
    },
    phoneInputView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fcfcfc",
        marginTop: 10
    },
    phoneNumberView: {
        marginTop: hp('1%'),
        justifyContent: 'center',
        marginLeft: wp('4%'),
        width: wp('90%'),
        height: hp('7%'),
        borderRadius: 5,
    },
    buttonView: {
        marginTop: hp('5%'),
        paddingHorizontal: 30,

    },
    otpText: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#000'

    },
})



