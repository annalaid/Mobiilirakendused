
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';

export default function Calender() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => { 
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
    }
  }

  if (hasPermission === false) {
    return <Text>Kaamerale ligipääs puudub</Text>
  }
  if (hasPermission === null) {
    return <View />;
  }
    return (
        <View style = {styles.calender}>
          <View style={styles.cameraContainer}>
            <Camera ref={ref => setCamera(ref) /* Siin referitakse telefoni kaamera ekraanil nähtud kaadritega */}
            style={styles.fixedRatio}
            type={type}
            ratio={'1:1'}
            />
          </View>
          <Button
          title="Vaheta kaamerat"
          onPress={()=> {
            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
          }}/>
          <Button title="Pildista"
          onPress={() => takePicture()}
          />
          {image && <Image source={{uri: image}} style={{flex:1}}/>}
          

          
        </View>
      );
}

const styles = StyleSheet.create({
  calender: {
    flex: 1, 
    backgroundColor: '#1aa'
  },
  cameraContainer: {
    flex: 1,
    flexDirection:'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});