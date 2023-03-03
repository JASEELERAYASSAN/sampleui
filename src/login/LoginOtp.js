import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Toast from 'react-native-simple-toast'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RnOtpTimer from 'rn-otp-timer';

const LoginOtp = ({ navigation, route }) => {
    const [image,setImage] =useState(route.params.image)
    const [confirm, setConfirm] = useState(route.params.confirm);
    const [code, setCode] = useState(route.params.confirm.code ? route.params.confirm.code : '');
    const [isloading, setIsLoading] = useState(false)

    async function confirmCode() {
        try {
            await confirm.confirm(code).then(() => {
                setIsLoading(false);
                navigation.navigate('PopupScreen',{ image });
            }).catch(() => {
                setIsLoading(false);
                Toast.show("please check you pin again", Toast.SHORT);
            })
        } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                setIsLoading(false);
            } else if (error.code === 'auth/user-disabled') {
                setIsLoading(false);
                Toast.show('Sorry, this phone number has been blocked.', Toast.SHORT)
            } else if (error.code === 'auth/invalid-credential') {
                setIsLoading(false);
                Toast.show('Invalid Credential.', Toast.SHORT)
            } else {
                setIsLoading(false);
                Toast.show('Sorry, we couldn\'t verify your phone number at the moment.', Toast.SHORT);
            }
        }
    }

    const onSubmit = () => {
        if (code.length === 6) {
            setIsLoading(true);
            confirmCode();
        } else {
            Toast.show('OTP cannot be empty', Toast.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.enterText}>
                <Text style={styles.enterOtp}>Enter  OTP</Text>
                <Text style={styles.OtpSubtext}>We have sent an OTP to  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginActivity')}>
                    <Text style={styles.changeNumber}>CHANGE NUMBER</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', height: hp('24%') }}>
                <OTPInputView
                    pinCount={6}
                    style={styles.enterPin}
                    code={code}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeChanged={text => setCode(text)}
                />
                <RnOtpTimer
                        minutes={0}
                        seconds={60}
                        resendButtonStyle={[styles.timer, { padding: 0 }]}
                        timerStyle={styles.timer}
                        resendButtonTextStyle={{ color: 'red', fontFamily: 'Manrope-Bold', fontSize: hp('1.55%'), padding: 0 }}
                        resendButtonText="Resend OTP"
                        resendButtonAction={() => signInWithPhoneNumber('+')}
                    />
                <TouchableOpacity activeOpacity={0.90} style={styles.submitButton} onPress={onSubmit}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default LoginOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    enterOtp: {
        color: 'black',
        fontSize: hp('2.20%'),
        fontFamily: 'Manrope-Bold',
        marginLeft: wp('6.50%'),
        fontWeight:'900',
        textAlign:'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    enterText: {
        marginTop: hp('4%'),
        textAlign:'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    OtpSubtext: {
        fontSize: hp('1.65%'),
        marginLeft: wp('6.50%'),
        color: '#000',
        fontWeight: '400',
        margin: wp('3%'),
        marginTop: hp('2%'),
    },
    changeNumber: {
        fontSize: hp('1.55%'),
        color: '#FFD700',
        fontFamily: 'Manrope-Bold',
        marginLeft: wp('6.50%'),
        textAlign:'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    enterPin: {
        height: hp('6.75%'),
        width: wp('90%'),
        margin: wp('1%'),
        padding: 10,
        marginLeft: wp('6.50%'),
        marginTop: 10,

    },
    submitButton: {
        flexDirection: 'row',
        height: hp('6.5%'),
        width: wp('90%'),
        backgroundColor: 'black',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('4%'),
        marginLeft: wp('6.50%'),
        marginRight: wp('6.50%'),
        elevation: 5,
        borderRadius: 5,
    },
    submitText: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: hp('1.70'),
        fontFamily: 'Manrope-Bold',
        letterSpacing: wp('.10%'),
    },
    timer: {
        alignSelf: 'flex-end',
        marginRight: wp('5%'),
        marginTop: hp('1%')
    }

})