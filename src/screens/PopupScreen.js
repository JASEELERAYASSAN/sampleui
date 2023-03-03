import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'
import { openCamera, openPicker } from 'react-native-image-crop-picker';


const PopupScreen = ({ route, navigation }) => {
  // const image = route.params.image
  const [image, setImage] = useState(route.params.image)

  const onClickImage = () => {
    setPopup(!popup)
    openCamera({
      width: wp('100%'),
      height: hp('100%'),
      cropping: true,
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

  return (
    <View style={styles.container}>
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
            onPress={() => setPopup(!popup)}
          >
            <Image source={image ? { uri: image.path } : { uri: 'https://cdn4.iconfinder.com/data/icons/camping-outline-pt-4/100/125_-_photo_camera_snapshot-512.png' }} style={styles.addedImage} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20,marginTop:hp('5%') }}>Getting started is easy</Text>
        <Text style={{ color: '#9ba8bd', fontSize: 19, textAlign: 'center', paddingHorizontal: 26, marginTop: 5 }}>Create your user and workspace name,add coworkers and you're in</Text>
      </View>
      <View style={styles.buttonContainerView}>
        <View style={styles.backButtonView}>
          <TouchableOpacity style={styles.backButton}
            onPress={() => navigation.navigate('LoginScreen', { image })}>
            <Icon name='arrow-back' size={25} color="#000" style={styles.icon2} />
          </TouchableOpacity>
        </View>
        <View style={styles.nextButtonView}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('HomeScreen')} >
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PopupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    height: hp('65%'),
    width: wp('100%'),
    backgroundColor: '#fff'
  },
  imageViewContainer: {
    height: 250,
    width: 250,
    marginLeft: 80,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
  },
  addedImage: {
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  addImage: {
    height: 250,
    width: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e4e3'
  },
  icon1: {
    marginLeft: hp('13%'),
    marginTop: hp('13%'),
  },
  icon2: {
    marginRight: hp('13%'),
  },
  buttonContainerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('20%')
  },
  backButtonView: {
    padding: 15,
    paddingLeft: 15
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginLeft: hp('5%'),
    backgroundColor: '#000',
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