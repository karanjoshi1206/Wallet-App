import {useCallback, useEffect, useMemo, useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
const Scan = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  // useEffect(() => {
  //   requestCameraPermission();
  // }, []);
  // const requestCameraPermission = useCallback(async () => {
  //   const permission = await Camera.requestCameraPermission();
  //   console.log('permission is ', permission);
  //   if (permission == 'denied') await Linking.openSettings();
  // }, []);

  return (
    <Text>Hell</Text>
    // <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default Scan;

const styles = StyleSheet.create({});
