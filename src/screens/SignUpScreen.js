import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import { openCamera, openPicker } from 'react-native-image-crop-picker';


const SignUpScreen = ({ navigation }) => {
  const [image, setImage] = useState()

  const onClickImage = () => {
    setPopup(!popup)
    openCamera({
      width: hp('100%'),
      height: hp('100%'),
      mediaType: 'photo',
    }).then(image => {
      setImage(image)
      Toast.show('Image added successfully', Toast.LONG)
      console.log(image)
    }).catch(error => {
      Toast.show('Image clicking failed', Toast.LONG)
      console.log(error)
    })
  }

  const onSelectImage = () => {
    setPopup(!popup)
    openPicker({
      width: wp('100%'),
      height: hp('100%'),
      cropping: true
    }).then(image => {
      console.log(image);
    }).catch(error => {
      Toast.show('Image adding failed', Toast.LONG)
      console.log(error)
    })
  }

  const [popup, setPopup] = useState(false)

  const handleClickEmail = () => {
    Toast.show('Sign Up with EMAIL is Completed', Toast.LONG)
  }
  const handleClickGoogle = () => {
    Toast.show('Sign Up with GOOGLE is Completed', Toast.LONG)
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity activeOpacity={.1}
          onPress={() => { navigation.navigate('Screen04') }}>
          <Text style={{ color: '#000', fontSize: 15, textAlign: 'right', marginRight: 10, marginTop: 10, fontWeight: 'bold' }}>Skip Tour</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageViewContainer}>
          <Modal
            animationType={'fade'}
            transparent
            visible={popup}
            presentationStyle='overFullScreen'
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#000', borderWidth: 2 }}>
              <View style={{
                backgroundColor: '#b5bcbd',
                borderRadius: 10,
                height: hp('35%'),
                width: hp('35%'),
                borderWidth: 2,
                borderColor: '#000'
              }}>
                <TouchableOpacity onPress={() => onClickImage()}>
                  <Text style={styles.cameraButton}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSelectImage()}>
                  <Text style={styles.cameraButton}>Open Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPopup(!popup)}>
                  <Text style={styles.closeButton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity activeOpacity={.5}
            style={styles.addImage}
            onPress={() => setPopup(!popup)}>
            <Image source={image ? { uri: image.path } : { uri: 'https://cdn4.iconfinder.com/data/icons/camping-outline-pt-4/100/125_-_photo_camera_snapshot-512.png' }} style={styles.addedImage} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#000', fontSize: 30, fontWeight: '900', textAlign: 'center', paddingHorizontal: 20 }}>Record spendings & income</Text>
        <Text style={{ color: '#9ba8bd', fontSize: 21, textAlign: 'center', paddingHorizontal: 25 }}>Just add transactions and you'll always know where your money goes</Text>
      </View>
      <View style={styles.bullettinView}>
        <TouchableOpacity activeOpacity={.1}>
          <Text style={styles.bullettinText}>{'\u2B24'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={'green'}>
          <Text style={styles.bullettinText}>{'\u2B28'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={'green'}>
          <Text style={styles.bullettinText}>{'\u2B28'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={'green'}>
          <Text style={styles.bullettinText}>{'\u2B28'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.signUpEmailButton}
          onPress={handleClickEmail} >
          <Text style={{ color: '#fff' }}>Sign Up with Email ID</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.signUpGmailButton}
            onPress={handleClickGoogle}>
            <Icon name='logo-google' size={17} color="#9ba8bd" />
            <Text style={{ color: '#000', marginLeft: 5 }}>Sign Up with Google</Text>
          </TouchableOpacity >
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('4%') }}>
          <Text style={{ color: '#000', fontSize: 15, textAlign: 'center' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen', { image }) }}>
            <Text style={{ color: '#000', fontSize: 15, textAlign: 'center' }}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    height: hp('60%'),
    width: wp('100%'),
    backgroundColor: '#fff'
  },
  imageViewContainer: {
//     height:50,
// width:50,
    height: hp('30%'),
    width: wp('60%'),
    backgroundColor: '#fff',
    marginLeft: hp('11%'),
    marginTop: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('15%'),
    backgroundColor: '#dce0e6'
  },
  addedImage: {
    height: hp('30%'),
    width: wp('60%'),
    borderRadius: hp('15%'),
  },
  addImage: {
    height: hp('30%'),
    width: wp('60%'),
    borderRadius: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dce0e6'
  },
  icon1: {
    marginLeft: hp('13%'),
    marginTop: hp('13%'),
  },
  bullettinView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bullettinText: {
    padding: 5
  },
  buttonView: {
    justifyContent: 'center',
    marginTop: hp('3%')
  },
  signUpEmailButton: {
    borderWidth: 2,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: hp('3%'),
    backgroundColor: '#000',
    marginBottom: 5
  },
  signUpGmailButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
    marginLeft: hp('3%'),
    borderWidth: 2,
    paddingVertical: 10,
  },
  cameraButton: {
    textAlign: 'center',
    marginTop: hp('4%'),
    borderRadius: 10,
    color: '#000',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: hp('4%'),
    marginRight: hp('4%'),
    fontWeight: '900',
    fontSize: 17
  },
  closeButton: {
    textAlign: 'center',
    marginTop: hp('3%'),
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#000',
    padding: 10,
    marginLeft: hp('7%'),
    marginRight: hp('7%'),
    fontWeight: '900',
    fontSize: 17
  }
})